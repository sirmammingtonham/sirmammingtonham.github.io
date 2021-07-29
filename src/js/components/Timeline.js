import * as THREE from "three";
import { TweenMax } from "gsap";
import TinyGesture from "tinygesture";
import AssetLoader from "../utils/AssetLoader";
import { ImageItem } from "./Item";
import Section from "./Section";
import Konami from "konami";

import pages from "../config/pages";
import assetData from "../config/assetData";

export default class Timeline {
  constructor() {
    this.setConfig();
    this.init();

    if (!window.assets) {
      this.loadAssets();
      console.log("reload assets");
    } else {
      console.log("cached assets");
      this.assets = window.assets;
      this.createTimeline();
    }
  }

  setConfig() {
    this.dom = {
      cursor: document.querySelector(".cursor"),
      compass: document.querySelector(".compass"),
      compassSvg: document.querySelector(".compass svg"),
      mainSvgs: document.querySelectorAll("main :not(.compass) svg"),
      cursorSvgs: document.querySelectorAll(".cursor svg"),
    };

    this.c = {
      dpr: window.devicePixelRatio >= 2 ? 2 : 1,
      startTime: Date.now(),
      size: {
        w: window.innerWidth,
        h: window.innerHeight,
      },
      scrollPos: 0,
      scrolling: false,
      allowScrolling: true,
      autoMoveSpeed: 0,
      isMobile: this.isMobile(),
      holdingMouseDown: false,
      touchEnabled: "ontouchstart" in window,
    };

    this.c.globalScale = Math.min(1, this.c.size.w / 1400);

    if (this.c.touchEnabled)
      document.documentElement.classList.add("touch-enabled");
    else document.documentElement.classList.add("enable-cursor");

    this.assetList = Object.fromEntries(
      Object.entries(assetData).map(([key, val], _) => [key, Object.keys(val)])
    );
    this.assetList.resume = ["resume.png"];
    this.assetList.end = ["wave.mp4"];
    this.assetData = assetData;

    this.timelineEntered = false;
    this.activePage = "intro";
    this.pages = pages;
    this.pagePositions = {};
    this.remainingPages = [];
    this.enableLoader = true;
    this.gyroEnabled = false;
    this.orientation = {
      gamma: 0,
      beta: 0,
    };

    this.easterEgg = this.easterEgg.bind(this);
    new Konami(this.easterEgg);
    this.easterEggEnabled = false;

    if (!this.enableLoader)
      document.querySelector(".loading").style.display = "none";
  }

  isMobile() {
    let a = navigator.userAgent || navigator.vendor || window.opera;
    return (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    );
  }

  loadAssets() {
    let assetLoader = new AssetLoader(this.c.isMobile);

    if (this.enableLoader) {
      setTimeout(() => {
        assetLoader.load(this.assetList, this.renderer).then((assets) => {
          this.assets = assets;
          console.log("ASSETS LOADED");

          // all assets loaded - initialise
          this.createTimeline();
        });
      }, 2000);
    } else {
      assetLoader.load(this.assetList, this.renderer).then((assets) => {
        this.assets = assets;
        console.log("ASSETS LOADED");

        // all assets loaded - initialise
        this.createTimeline();
      });
    }
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(this.c.dpr);
    this.renderer.setSize(this.c.size.w, this.c.size.h);
    document.body.appendChild(this.renderer.domElement);
    this.preventPullToRefresh();

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xaec7c3);
    this.scene.fog = new THREE.Fog(0xaec7c3, 900, 1600);
    this.scene.scale.set(this.c.globalScale, this.c.globalScale, 1);

    let cameraPosition = 800;

    const fov =
      (180 * (2 * Math.atan(this.c.size.h / 2 / cameraPosition))) / Math.PI;
    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.c.size.w / this.c.size.h,
      1,
      1600
    );
    this.camera.position.set(0, this.enableLoader ? 2000 : 0, cameraPosition);

    this.raycaster = new THREE.Raycaster();
    this.raycaster.near = this.camera.near;
    this.raycaster.far = this.camera.far;
    this.intersects = [];
    this.linkIntersect = [];
    this.whooshIntersects = [];
    this.frustum = new THREE.Frustum();
    this.cameraViewProjectionMatrix = new THREE.Matrix4();
    this.mouse = new THREE.Vector2();
    this.mousePerspective = new THREE.Vector2();

    window.addEventListener("devicemotion", (event) => {
      if (
        event.rotationRate.alpha ||
        event.rotationRate.beta ||
        event.rotationRate.gamma
      ) {
        this.gyroEnabled = true;
      }
    });
  }

  createTimeline() {
    this.timeline = new THREE.Group();
    this.scene.add(this.timeline);

    this.textMat = new THREE.MeshBasicMaterial({
      color: 0x1b42d8,
      transparent: true,
    });
    this.textItemMat = new THREE.MeshBasicMaterial({
      color: 0x1b42d8,
      transparent: true,
    });
    this.textItemUnderlineMat = new THREE.MeshBasicMaterial({
      color: 0x1b42d8,
      transparent: true,
    });
    this.captionTextMat = new THREE.MeshBasicMaterial({
      color: 0x1b42d8,
      transparent: true,
      opacity: 0,
      visible: false,
    });
    this.linkUnderlineMat = new THREE.MeshBasicMaterial({
      color: 0x1b42d8,
      transparent: true,
      opacity: 0,
      visible: false,
    });
    this.textOutlineMat = new THREE.MeshBasicMaterial({
      color: 0x1b42d8,
      transparent: true,
    });
    this.contactTextMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    this.sections = {};
    this.items = {};
    this.itemMeshes = []; // array for raycasting mouse
    this.videoItems = [];

    let nextPagePos = 0;

    for (let page in this.pages) {
      this.sections[page] = new Section({
        timeline: timeline,
        section: page,
      });

      let bbox = new THREE.Box3().setFromObject(this.sections[page]);

      this.sections[page].position.z = nextPagePos;
      this.pagePositions[page] = nextPagePos + 900; // how early we switch colors
      let posOffset = 1600; // TODO: get from camera?
      //   if (page === "intro") posOffset = 1900;
      if (page === "contact") posOffset = 1800;

      nextPagePos += bbox.min.z - posOffset;
      //   console.log({
      //     page,
      //     z: this.sections[page].position.z,
      //     position: nextPagePos + 900,
      //     nextPagePos,
      //     bboxz: bbox.min.z,
      //   });
      this.timeline.add(this.sections[page]);

      if (page === "end") this.stopScrollPos = this.sections[page].position.z;
    }

    this.videoCount = this.videoItems.length;

    this.resumeSection = new Section({
      timeline: timeline,
      section: "resume",
    });
    this.resumeSection.visible = false;
    this.scene.add(this.resumeSection);

    this.linkGroup = new THREE.Group();

    let linkGeom = new THREE.TextGeometry("SEE MORE", {
      font: this.assets.fonts["SuisseIntl-Bold"],
      size: 6,
      height: 0,
      curveSegments: 4,
    }).center();

    this.link = new THREE.Mesh(linkGeom, this.captionTextMat);

    this.linkUnderline = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(45, 1),
      this.linkUnderlineMat
    );
    this.linkUnderline.position.set(0, -10, 0);

    // for raycasting so it doesn't just pick up on letters
    this.linkBox = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(70, 20),
      new THREE.MeshBasicMaterial({ alphaTest: 0, visible: false })
    );
    this.linkGroup.visible = false;

    this.linkGroup.add(this.link);
    this.linkGroup.add(this.linkUnderline);
    this.linkGroup.add(this.linkBox);
    this.scene.add(this.linkGroup);

    console.log("RENDER");
    this.animate();
    this.initCursorListeners();
    this.initListeners();
    document.body.classList.add("ready");
  }

  moveToStart() {
    TweenMax.to(this.camera.position, 2, {
      y: 0,
      ease: "Expo.easeInOut",
    });

    TweenMax.to(".loading", 2, {
      y: "-100%",
      ease: "Expo.easeInOut",
      onComplete: () => {
        document.querySelector(".loading").style.display = "none";
        this.timelineEntered = true;
      },
    });

    TweenMax.to([".resume", ".logo", ".social"], 2, {
      y: 0,
      delay: 1,
      ease: "Expo.easeInOut",
    });

    TweenMax.to([".left", ".right"], 2, {
      x: 0,
      delay: 1,
      ease: "Expo.easeInOut",
    });

    if (this.gyroEnabled) {
      TweenMax.to(this.dom.compass, 2, {
        y: 0,
        delay: 1,
        ease: "Expo.easeInOut",
      });
    }
  }

  openItem(item) {
    this.itemAnimating = true;
    this.itemOpen = item;
    this.origTimelinePos = this.timeline.position.z;
    this.c.allowScrolling = false;

    if (this.c.isMobile) {
      let texture = item.mesh.material.uniforms.texture.value;
      if (texture.mediaType === "video") {
        texture.image.src = "assets/" + texture.name;
        texture.image.play();
      }
    }

    let posOffset = this.sections[this.activePage].position.z;

    if (item.page !== this.activePage) {
      posOffset =
        this.sections[this.remainingPages[this.remainingPages.length - 2]]
          .position.z;
    }
    let y = 100;
    if (item.isText) y = 100;
    if (item.assetId === "about/me.jpg") y = 200;

    TweenMax.to(item.position, 1.5, {
      x: 0,
      y,
      ease: "Expo.easeInOut",
      onComplete: () => {
        this.itemAnimating = false;
        this.dom.cursor.dataset.cursor = "cross";
      },
    });

    TweenMax.to(item.uniforms.progress, 1.5, {
      value: 1,
      ease: "Expo.easeInOut",
    });

    TweenMax.to(this.timeline.position, 1.5, {
      z:
        -(posOffset + item.position.z) + (this.c.globalScale < 0.5 ? 450 : 300),
      ease: "Expo.easeInOut",
    });

    TweenMax.to(this.textMat, 1, {
      opacity: 0,
      ease: "Expo.easeInOut",
      onComplete: () => {
        this.textMat.visible = false;
      },
    });

    TweenMax.to(this.captionTextMat, 2, {
      opacity: 1,
      ease: "Expo.easeInOut",
      delay: 0.3,
      onStart: () => {
        this.captionTextMat.visible = true;
      },
    });

    TweenMax.to(this.linkUnderlineMat, 2, {
      opacity: 0.4,
      ease: "Expo.easeInOut",
      delay: 0.3,
      onStart: () => {
        this.linkUnderlineMat.visible = true;
      },
    });

    TweenMax.to(this.textItemUnderlineMat, 2, {
      opacity: 0,
      ease: "Expo.easeInOut",
    });

    if (item.caption) {
      TweenMax.fromTo(
        item.caption.position,
        2,
        {
          z: -100,
        },
        {
          z: 50,
          delay: 0.2,
          ease: "Expo.easeInOut",
          onStart: () => {
            item.caption.visible = true;
          },
        }
      );
    }

    if (item.data.link) {
      this.linkBox.onClick = () => {
        window.open(item.data.link, "_blank");
      };

      this.linkGroup.position.y = item.caption.position.y + 45; 
// item.caption
//         ? item.caption.position.y - 20
//         : -item.mesh.scale.y / 2 - 50;
console.log(item.caption.position.y - 20);
console.log(-item.mesh.scale.y / 2 - 50);
    console.log(this.linkGroup.position.y);

      TweenMax.fromTo(
        this.linkGroup.position,
        2,
        {
          z: 0,
        },
        {
          z: this.c.globalScale < 0.5 ? 450 : 300,
          delay: 0.3,
          ease: "Expo.easeInOut",
          onStart: () => {
            this.linkGroup.visible = true;
          },
        }
      );
    }

    let pos = new THREE.Vector2();

    for (let x in this.items) {
      if (this.items[x] === item) continue;
      if (this.items[x].isText) {
        TweenMax.to(this.items[x].position, 1.3, {
          y: this.items[x].origPos.y > 0 ? 10000 : -10000,
          ease: "Expo.easeInOut",
        });
        continue;
      }
      if (this.items[x].align === 0) pos.set(-700, 700); // bottom left
      if (this.items[x].align === 1) pos.set(700, 700); // bottom right
      if (this.items[x].align === 2) pos.set(700, -700); // top right
      if (this.items[x].align === 3) pos.set(-700, -700); // top left

      TweenMax.to(this.items[x].material.uniforms.opacity, 1.3, {
        value: 0,
        ease: "Expo.easeInOut",
      });

      TweenMax.to(this.items[x].position, 1.3, {
        x: pos.x,
        y: pos.y,
        ease: "Expo.easeInOut",
      });
    }
  }

  closeItem() {
    if (!this.itemAnimating && this.itemOpen) {
      this.itemAnimating = true;
      this.dom.cursor.dataset.cursor = "pointer";

      if (this.c.isMobile) {
        let texture = this.itemOpen.mesh.material.uniforms.texture.value;
        if (texture.mediaType === "video") {
          texture.image.pause();
          texture.image.src = "";
          texture.image.load();
        }
      }

      TweenMax.to(this.itemOpen.position, 1.5, {
        x: this.itemOpen.origPos.x,
        y: this.itemOpen.origPos.y,
        ease: "Expo.easeInOut",
      });

      TweenMax.to(this.timeline.position, 1.5, {
        z: this.origTimelinePos,
        ease: "Expo.easeInOut",
        onComplete: () => {
          this.c.allowScrolling = true;
          this.itemOpen = false;
          this.itemAnimating = false;
        },
      });

      TweenMax.to(this.itemOpen.uniforms.progress, 1.5, {
        value: 0,
        ease: "Expo.easeInOut",
      });

      TweenMax.to(this.textMat, 1.5, {
        opacity: 1,
        ease: "Expo.easeInOut",
        onStart: () => {
          this.textMat.visible = true;
        },
      });

      TweenMax.to(this.textItemUnderlineMat, 1.5, {
        opacity: 1,
        ease: "Expo.easeInOut",
      });

      TweenMax.to([this.captionTextMat, this.linkUnderlineMat], 0.4, {
        opacity: 0,
        ease: "Expo.easeInOut",
        onComplete: () => {
          this.captionTextMat.visible = false;
          this.linkUnderlineMat.visible = false;
          if (this.itemOpen.caption) this.itemOpen.caption.visible = false;
          this.linkGroup.visible = false;
        },
      });

      for (let x in this.items) {
        if (this.items[x].active) continue;

        if (this.items[x].isText) {
          TweenMax.to(this.items[x].position, 1.3, {
            y: this.items[x].origPos.y,
            ease: "Expo.easeInOut",
          });
          continue;
        }

        TweenMax.to(this.items[x].material.uniforms.opacity, 1.5, {
          value: 1,
          ease: "Expo.easeInOut",
        });

        TweenMax.to(this.items[x].position, 1.5, {
          x: this.items[x].origPos.x,
          y: this.items[x].origPos.y,
          ease: "Expo.easeInOut",
        });
      }
    }
  }

  openResume(e) {
    e.preventDefault();

    if (this.resumeSection.isOpen) return this.closeResume();

    this.dom.cursor.dataset.cursor = "cross";

    this.resumeSection.visible = true;
    this.resumeSection.isOpen = true;
    this.c.allowScrolling = false;
    this.linkUnderlineMat.visible = true;
    this.linkUnderlineMat.opacity = 0.3;

    TweenMax.to(this.camera.position, 2, {
      y: this.resumeSection.position.y * this.scene.scale.y,
      ease: "Expo.easeInOut",
      onComplete: () => {
        this.timeline.visible = false;
      },
    });
  }

  closeResume() {
    this.timeline.visible = true;
    this.resumeSection.isOpen = false;

    TweenMax.to(this.camera.position, 2, {
      y: 0,
      ease: "Expo.easeInOut",
      onComplete: () => {
        this.resumeSection.visible = false;
        this.c.allowScrolling = true;
        this.linkUnderlineMat.visible = false;
        this.linkUnderlineMat.opacity = 0;
      },
    });
  }

  scroll(e) {
    let delta = normalizeWheelDelta(e);

    this.c.scrollPos += -delta * 60;
    this.c.scrolling = true;

    function normalizeWheelDelta(e) {
      if (e.detail && e.wheelDelta)
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      // Opera
      else if (e.deltaY) return -e.deltaY / 60;
      // Firefox
      else return e.wheelDelta / 120; // IE,Safari,Chrome
    }
  }

  mouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.easterEggEnabled) return;

    this.c.holdingMouseDown = true;

    if (this.resumeSection.isOpen) {
      if (this.linkIntersect.length > 0) {
        if (this.linkIntersect[0].object.onClick)
          this.linkIntersect[0].object.onClick();
      } else {
        this.closeResume();
      }
    } else if (this.itemOpen) {
      if (this.linkIntersect.length > 0) {
        if (this.linkIntersect[0].object.onClick)
          this.linkIntersect[0].object.onClick();
      } else {
        this.closeItem();
      }
    } else {
      if (this.intersects.length > 0) {
        this.openItem(this.intersects[0].object.parent);
        this.dom.cursor.dataset.cursor = "cross";
      } else if (this.hoveringWhoosh) {
        this.c.scrolling = true;

        TweenMax.to(this.c, 4, {
          scrollPos: 0,
          ease: "Expo.easeInOut",
          onUpdate: () => {
            this.c.scrolling = true;
          },
        });
      } else {
        this.dom.cursor.dataset.cursor = "move";

        TweenMax.to(this.c, 0.5, {
          delay: 0.7,
          autoMoveSpeed: 20,
        });
      }
    }
  }

  mouseUp() {
    if (!this.itemOpen) this.dom.cursor.dataset.cursor = "pointer";
    this.c.holdingMouseDown = false;
    TweenMax.killTweensOf(this.c, { autoMoveSpeed: true });
    this.c.autoMoveSpeed = 0;
  }

  mouseMove(e) {
    this.mousePerspective.x = e.clientX / window.innerWidth - 0.5;
    this.mousePerspective.y = e.clientY / window.innerHeight - 0.5;
    this.updatingPerspective = true;

    if (!this.c.touchEnabled) {
      TweenMax.to(".cursor", 1.5, {
        x: e.clientX,
        y: e.clientY,
        ease: "Power4.easeOut",
      });
    }

    if (
      !this.renderer ||
      e.target !== this.renderer.domElement ||
      this.easterEggEnabled
    )
      return;

    this.mouse.x = (e.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // raycast for items when in timeline mode
    if (
      !this.resumeSection.isOpen &&
      !this.itemOpen &&
      !this.c.holdingMouseDown
    ) {
      if (this.activePage === "end") {
        this.intersects = [];
        this.whooshIntersects = this.raycaster.intersectObjects(
          this.sections["end"].whoosh.children
        );

        if (this.whooshIntersects.length > 0) {
          this.dom.cursor.dataset.cursor = "none";
          this.hoveringWhoosh = true;
          this.sections["end"].arrowTween.timeScale(2);
        } else if (this.hoveringWhoosh) {
          this.dom.cursor.dataset.cursor = "pointer";
          this.hoveringWhoosh = false;
          this.sections["end"].arrowTween.timeScale(1);
        }
      } else {
        this.intersects = this.raycaster.intersectObjects(this.itemMeshes);

        if (this.intersects.length > 0) {
          this.dom.cursor.dataset.cursor = "eye";
        } else if (this.dom.cursor.dataset.cursor !== "pointer") {
          this.dom.cursor.dataset.cursor = "pointer";
        }
      }
      //   if (this.activePage === "skills") {
      //     this.linkIntersect = this.raycaster.intersectObject(
      //       this.sections["skills"].linkBox
      //     );

      //     if (this.linkIntersect.length > 0) {
      //       this.dom.cursor.dataset.cursor = "eye";
      //     } else if (this.dom.cursor.dataset.cursor !== "cross") {
      //       this.dom.cursor.dataset.cursor = "cross";
      //     }
      //   }
    }

    // raycast for item link
    if (
      !this.resumeSection.isOpen &&
      this.itemOpen &&
      this.itemOpen.data.link
    ) {
      this.linkIntersect = this.raycaster.intersectObject(this.linkBox);

      if (this.linkIntersect.length > 0) {
        this.dom.cursor.dataset.cursor = "eye";
      } else if (this.dom.cursor.dataset.cursor !== "cross") {
        this.dom.cursor.dataset.cursor = "cross";
      }
    }

    if (this.resumeSection.isOpen) {
      this.linkIntersect = this.raycaster.intersectObject(
        this.resumeSection.linkBox
      );

      if (this.linkIntersect.length > 0) {
        this.dom.cursor.dataset.cursor = "eye";
      } else if (this.dom.cursor.dataset.cursor !== "cross") {
        this.dom.cursor.dataset.cursor = "cross";
      }
    }
  }

  updatePerspective() {
    TweenMax.to(this.camera.rotation, 4, {
      x: -this.mousePerspective.y * 0.5,
      y: -this.mousePerspective.x * 0.5,
      ease: "Power4.easeOut",
    });

    if (this.activePage === "end") {
      TweenMax.to(this.sections["end"].arrow.rotation, 4, {
        x: -1.5 + this.mousePerspective.y * 0.2,
        y: this.mousePerspective.x * 0.8,
        ease: "Power4.easeOut",
      });
    }

    this.updatingPerspective = false;
  }

  updateOrientation(e) {
    this.orientation.gamma = e.gamma ? e.gamma : 0;
    this.orientation.beta = e.beta ? e.beta : 0;

    if (!this.initialOrientation) {
      this.initialOrientation = {
        gamma: this.orientation.gamma,
        beta: this.orientation.beta,
      };
    }

    TweenMax.to(this.camera.rotation, 2, {
      x: this.orientation.beta
        ? (this.orientation.beta - this.initialOrientation.beta) *
          (Math.PI / 300)
        : 0,
      y: this.orientation.gamma
        ? (this.orientation.gamma - this.initialOrientation.gamma) *
          (Math.PI / 300)
        : 0,
      ease: "Power4.easeOut",
    });
  }

  resetOrientation(e) {
    this.initialOrientation = {
      gamma: this.orientation.gamma,
      beta: this.orientation.beta,
    };
  }

  changeColours(override = false) {
    this.remainingPages = Object.keys(this.pagePositions).filter((key) => {
      return this.timeline.position.z > -this.pagePositions[key]; // TODO: look into detecting if exists in camera
    });

    if (
      override ||
      (this.remainingPages[this.remainingPages.length - 1] &&
        this.activePage !== this.remainingPages[this.remainingPages.length - 1])
    ) {
      if (override) {
        this.activePage = override;
      } else {
        this.activePage = this.remainingPages[this.remainingPages.length - 1];
      }

      let bgColor = new THREE.Color(this.pages[this.activePage].bgColor);
      let textColor = new THREE.Color(this.pages[this.activePage].textColor);
      let tintColor = new THREE.Color(this.pages[this.activePage].tintColor);
      let interfaceColor;

      TweenMax.to([this.scene.fog.color, this.scene.background], 1, {
        r: bgColor.r,
        g: bgColor.g,
        b: bgColor.b,
        ease: "Power4.easeOut",
      });

      TweenMax.to(this.textMat.color, 1, {
        r: textColor.r,
        g: textColor.g,
        b: textColor.b,
        ease: "Power4.easeOut",
      });

      TweenMax.set(
        [
          this.textItemMat.color,
          this.captionTextMat.color,
          this.linkUnderlineMat.color,
          this.textItemUnderlineMat.color,
        ],
        {
          r: textColor.r,
          g: textColor.g,
          b: textColor.b,
        }
      );

      for (let id in this.items) {
        TweenMax.to(this.items[id].uniforms.gradientColor.value, 1, {
          r: tintColor.r,
          g: tintColor.g,
          b: tintColor.b,
          ease: "Power4.easeOut",
        });
      }

      if (this.pages[this.activePage].outlineTextColor) {
        let outlineTextColor = new THREE.Color(
          this.pages[this.activePage].outlineTextColor
        );
        interfaceColor = outlineTextColor.getHexString();

        TweenMax.to([this.textOutlineMat.color], 1, {
          r: outlineTextColor.r,
          g: outlineTextColor.g,
          b: outlineTextColor.b,
          ease: "Power4.easeOut",
        });
      } else {
        interfaceColor = textColor.getHexString();
      }

      if (this.pages[this.activePage].contactColor)
        this.contactTextMat.color.set(this.pages[this.activePage].contactColor);
      else this.contactTextMat.color.set(0xffffff);

      TweenMax.to(this.dom.mainSvgs, 1, {
        fill: `#${interfaceColor}`,
        ease: "Power4.easeOut",
      });
      TweenMax.to([this.dom.cursorSvgs, this.dom.compassSvg], 1, {
        stroke: `#${interfaceColor}`,
        ease: "Power4.easeOut",
      });
      TweenMax.to(".resume .underline", 1, {
        borderBottomColor: `#${interfaceColor}`,
        ease: "Power4.easeOut",
      });

      document
        .querySelector("meta[name=theme-color]")
        .setAttribute("content", "#" + bgColor.getHexString());

      if (this.activePage === "end" && !this.sections["end"].arrowTween) {
        this.sections["end"].arrowTween = TweenMax.to(
          this.sections["end"].arrow.position,
          1,
          {
            z: 0,
            repeat: -1,
            yoyo: true,
            ease: "Power2.easeInOut",
          }
        );
      } else if (this.sections["end"].arrowTween) {
        this.sections["end"].arrowTween = false;
      }
    }
  }

  handleVideos() {
    this.camera.updateMatrixWorld();
    this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld);
    this.cameraViewProjectionMatrix.multiplyMatrices(
      this.camera.projectionMatrix,
      this.camera.matrixWorldInverse
    );
    this.frustum.setFromMatrix(this.cameraViewProjectionMatrix);

    for (let i = 0; i < this.videoCount; i++) {
      if (
        this.frustum.intersectsObject(this.videoItems[i]) &&
        this.videoItems[i].material.uniforms.texture.value.image.paused
      ) {
        this.videoItems[i].material.uniforms.texture.value.image.play();
        continue;
      }

      if (
        !this.frustum.intersectsObject(this.videoItems[i]) &&
        !this.videoItems[i].material.uniforms.texture.value.image.paused
      ) {
        this.videoItems[i].material.uniforms.texture.value.image.pause();
      }
    }
  }

  animate() {
    this.animationId = requestAnimationFrame(this.animate.bind(this));

    if (!this.c.touchEnabled && this.updatingPerspective) {
      this.updatePerspective();
      this.updatingPerspective = false;
    }

    if (this.c.autoMoveSpeed > 0) {
      this.c.scrolling = true;
      this.c.scrollPos += this.c.autoMoveSpeed;
    }

    // smooth scrolling
    if (this.c.allowScrolling && this.c.scrolling) {
      if (this.c.scrollPos <= 0) this.c.scrollPos = 0;
      if (this.c.scrollPos >= -this.stopScrollPos)
        this.c.scrollPos = -this.stopScrollPos;

      let delta = (this.c.scrollPos - this.timeline.position.z) / 12;
      this.timeline.position.z += delta;

      if (!this.c.isMobile && Math.abs(delta) < 8) this.handleVideos();
      if (!this.easterEggEnabled) this.changeColours();

      // if( this.timeline.position.z < 700 ) {
      //     TweenMax.set( this.sections['intro'].circle.rotation, {
      //         z: '+=' + delta * 0.005
      //     })
      // }

      if (Math.abs(delta) > 0.1) {
        this.c.scrolling = true;
      } else {
        this.c.scrolling = false;
      }
    }

    if (this.hoveringWhoosh) {
      this.sections["end"].circle.rotation.z += 0.005;
    }

    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.c.size = {
      w: window.innerWidth,
      h: window.innerHeight,
    };
    this.camera.fov =
      (180 * (2 * Math.atan(this.c.size.h / 2 / this.camera.position.z))) /
      Math.PI;
    this.camera.aspect = this.c.size.w / this.c.size.h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.c.size.w, this.c.size.h);
  }

  eyeCursorElEnter() {
    this.dom.cursor.dataset.cursor = "eye";
  }

  eyeCursorElLeave() {
    this.dom.cursor.dataset.cursor = "pointer";
  }

  initListeners() {
    this.resize = this.resize.bind(this);
    this.scroll = this.scroll.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.openResume = this.openResume.bind(this);
    this.moveToStart = this.moveToStart.bind(this);

    window.addEventListener("resize", this.resize, false);
    this.renderer.domElement.addEventListener(
      "mousedown",
      this.mouseDown,
      false
    );
    this.renderer.domElement.addEventListener("mouseup", this.mouseUp, false);
    this.renderer.domElement.addEventListener("wheel", this.scroll, false);

    if (this.gyroEnabled) {
      this.updateOrientation = this.updateOrientation.bind(this);
      this.resetOrientation = this.resetOrientation.bind(this);
      window.addEventListener("deviceorientation", this.updateOrientation);
      this.dom.compass.addEventListener("click", this.resetOrientation, false);
    }

    document
      .querySelector(".resume")
      .addEventListener("click", this.openResume, false);
    if (this.enableLoader)
      document
        .querySelector(".enter")
        .addEventListener("click", this.moveToStart, false);

    this.gesture = new TinyGesture(this.renderer.domElement, {
      mouseSupport: false,
    });

    this.gesture.on("panmove", (e) => {
      this.c.scrollPos += -this.gesture.velocityY * 6;
      this.c.scrolling = true;
    });

    this.gesture.on("panend", (e) => (this.c.autoMoveSpeed = 0));
    this.gesture.on("longpress", (e) => (this.c.autoMoveSpeed = 10));

    if (!this.c.touchEnabled) {
      this.dom.cursor.dataset.cursor = "pointer";
    }
  }

  initCursorListeners() {
    this.eyeCursorElEnter = this.eyeCursorElEnter.bind(this);
    this.eyeCursorElLeave = this.eyeCursorElLeave.bind(this);
    this.mouseMove = this.mouseMove.bind(this);

    window.addEventListener("mousemove", this.mouseMove, false);

    let eyeCursorEls = document.querySelectorAll(".cursor-eye");
    for (let i = 0; i < eyeCursorEls.length; i++) {
      eyeCursorEls[i].addEventListener(
        "mouseenter",
        this.eyeCursorElEnter,
        false
      );
      eyeCursorEls[i].addEventListener(
        "mouseleave",
        this.eyeCursorElLeave,
        false
      );
    }
  }

  preventPullToRefresh() {
    var prevent = false;

    this.renderer.domElement.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) {
        return;
      }

      var scrollY =
        window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop;
      prevent = scrollY === 0;
    });

    this.renderer.domElement.addEventListener("touchmove", function (e) {
      if (prevent) {
        prevent = false;
        e.preventDefault();
      }
    });
  }

  easterEgg() {
    if (!this.timelineEntered) return;

    console.log("CHEATER!");

    this.easterEggEnabled = true;

    TweenMax.to(this.timeline.rotation, 2, {
      z: (360 * Math.PI) / 180,
      ease: "Power4.easeInOut",
    });

    this.discoColours();

    for (let i = 0; i < this.itemMeshes.length - 1; i++) {
      TweenMax.to(this.itemMeshes[i].rotation, 2, {
        z: (360 * Math.PI) / 180,
        ease: "Linear.easeNone",
        repeat: -1,
      });
    }

    TweenMax.to(this.sections["intro"].children[2].rotation, 2, {
      z: (360 * Math.PI) / 180,
      ease: "Linear.easeNone",
      repeat: -1,
    });

    for (let id in this.sections) {
      TweenMax.to(this.sections[id].children[0].position, 1, {
        z: 150,
        repeat: -1,
        yoyo: true,
        ease: "Linear.easeNone",
      });
    }
  }

  discoColours() {
    // rgb(15,252,75)
    // rgb(15,192,252)
    // rgb(252,15,192)
    // rgb(252,75,15)

    for (let id in this.items) {
      TweenMax.to(this.items[id].uniforms.gradientColor.value, 1, {
        r: 0.9882352941,
        g: 0.2941176471,
        b: 0.05882352941,
        ease: "Power4.easeOut",
        onComplete: () => {
          TweenMax.to(this.items[id].uniforms.gradientColor.value, 1, {
            r: 0.9882352941,
            g: 0.05882352941,
            b: 0.7529411765,
            ease: "Power4.easeOut",
            onComplete: () => {
              TweenMax.to(this.items[id].uniforms.gradientColor.value, 1, {
                r: 0.05882352941,
                g: 0.7529411765,
                b: 0.9882352941,
                ease: "Power4.easeOut",
                onComplete: () => {
                  TweenMax.to(this.items[id].uniforms.gradientColor.value, 1, {
                    r: 0.05882352941,
                    g: 0.9882352941,
                    b: 0.2941176471,
                    ease: "Power4.easeOut",
                  });
                },
              });
            },
          });
        },
      });
    }

    TweenMax.to(this.textMat.color, 1, {
      r: 0.9882352941,
      g: 0.2941176471,
      b: 0.05882352941,
      ease: "Power4.easeOut",
      onComplete: () => {
        TweenMax.to(this.textMat.color, 1, {
          r: 0.9882352941,
          g: 0.05882352941,
          b: 0.7529411765,
          ease: "Power4.easeOut",
          onComplete: () => {
            TweenMax.to(this.textMat.color, 1, {
              r: 0.05882352941,
              g: 0.7529411765,
              b: 0.9882352941,
              ease: "Power4.easeOut",
              onComplete: () => {
                TweenMax.to(this.textMat.color, 1, {
                  r: 0.05882352941,
                  g: 0.9882352941,
                  b: 0.2941176471,
                  ease: "Power4.easeOut",
                });
              },
            });
          },
        });
      },
    });

    TweenMax.to([this.scene.fog.color, this.scene.background], 1, {
      r: 0.05882352941,
      g: 0.9882352941,
      b: 0.2941176471,
      ease: "Power4.easeOut",
      onComplete: () => {
        TweenMax.to([this.scene.fog.color, this.scene.background], 1, {
          r: 0.05882352941,
          g: 0.7529411765,
          b: 0.9882352941,
          ease: "Power4.easeOut",
          onComplete: () => {
            TweenMax.to([this.scene.fog.color, this.scene.background], 1, {
              r: 0.9882352941,
              g: 0.05882352941,
              b: 0.7529411765,
              ease: "Power4.easeOut",
              onComplete: () => {
                TweenMax.to([this.scene.fog.color, this.scene.background], 1, {
                  r: 0.9882352941,
                  g: 0.2941176471,
                  b: 0.05882352941,
                  ease: "Power4.easeOut",
                  onComplete: () => {
                    this.discoColours();
                  },
                });
              },
            });
          },
        });
      },
    });
  }
}
