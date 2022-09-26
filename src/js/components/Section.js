import * as THREE from "three";
import { ImageItem, TextItem } from "./Item";
import sections from "../config/sections";

export default class Section extends THREE.Group {
  constructor(opts = { timeline, section }) {
    super();
    Object.assign(this, opts);

    this.createSection(this.section);
    switch (this.section) {
      case "intro": {
        this.addIntroBadge();
        break;
      }
      case "about": {
        this.timeline.items["about/me.jpg"] = new ImageItem({
          assetId: "about/me.jpg",
          timeline: this.timeline,
          texture: this.timeline.assets.textures[this.section]["me.jpg"],
          data: this.timeline.assetData[this.section]["me.jpg"],
          page: this.section,
          x: 0,
          y: 250,
          z: -900,
        });

        this.add(this.timeline.items["about/me.jpg"]);
        break;
      }
      case "projects": {
        break;
      }
      case "resume": {
        this.createResumeSection();
        break;
      }
      case "experience": {
        break;
      }
      case "publications": {
        break;
      }
      case "education": {
        break;
      }
      case "skills": {
        break;
      }
      case "contact": {
        break;
      }
      case "end": {
        this.addWhooshButton();
        break;
      }
      default: {
        this.addTitle(this.timeline.pages[this.section].name);
        break;
      }
    }
  }

  addTitle(title, y = null) {
    let textGeom = new THREE.TextBufferGeometry(title, {
      font: this.timeline.assets.fonts["Schnyder L"],
      size: 200,
      height: 0,
      curveSegments: 10,
    }).center();

    let pageName = new THREE.Mesh(textGeom, this.timeline.textMat);
    pageName.position.set(
      this.timeline.pages[this.section].offset || 0,
      y ?? 0,
      0
    );
    this.add(pageName);
  }

  addLinkBox(args) {
    let linkBox = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(args.size, args.size),
      new THREE.MeshBasicMaterial({ alphaTest: 0, visible: false })
    );
    linkBox.position.set(args.x, args.y, args.z);
    linkBox.onClick = args.onClick;
    this.add(linkBox);
  }

  addText(args) {
    let textGeom = new THREE.TextBufferGeometry(args.text, {
      font: this.timeline.assets.fonts[args.font],
      size: args.size,
      height: 0,
      curveSegments: args.segments ?? 6,
    }).center();
    let text = new THREE.Mesh(textGeom, this.timeline.textMat);
    text.position.set(args.x, args.y, args.z);
    this.add(text);
  }

  createSection(sectionId) {
    const data = sections[sectionId];
    if (!data) return;
    if (data["title"]) {
      if (typeof data["title"] === "string") {
        this.addTitle(data["title"]);
      } else {
        for (const titleData of data["title"]) {
          this.addTitle(titleData[0], titleData[1]);
        }
      }
    }

    if (data["texts"]) {
      for (const textData of data["texts"]) {
        this.addText(textData);
      }
    }

    if (data["assets"]) {
      let id,
        itemIndex = 0;

      // add items
      this.timeline.assetList[this.section].forEach((filename) => {
        id = `${this.section}/${filename}`;

        this.timeline.items[id] = new ImageItem({
          assetId: id,
          timeline: this.timeline,
          texture: this.timeline.assets.textures[this.section][filename],
          data: this.timeline.assetData[this.section][filename],
          page: this.section,
          itemIndex: itemIndex,
          itemIndexTotal: itemIndex,
        });

        this.add(this.timeline.items[id]);

        itemIndex++;
      });
    }

    if (data["textItems"]) {
      for (const itemData of data["textItems"]) {
        const id = itemData["itemId"];
        this.timeline.items[id] = new TextItem({
          timeline: this.timeline,
          page: this.section,
          ...itemData,
        });
        this.add(this.timeline.items[id]);
      }
    }
  }

  createResumeSection() {
    this.position.set(0, 2000 / this.timeline.scene.scale.y, 0);
    this.visible = false;

    let material = new THREE.MeshBasicMaterial({
      map: this.timeline.assets.textures["resume"]["resume.jpg"],
      transparent: true,
    });
    let geom = new THREE.PlaneGeometry(1, 1);
    let resume = new THREE.Mesh(geom, material);
    resume.scale.set(800, 1000, 1);
    resume.position.set(0, 0, 0);
    this.add(resume);

    // for raycasting so it doesn't just pick up on letters
    this.linkBox = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(800, 1000),
      new THREE.MeshBasicMaterial({ alphaTest: 0, visible: false })
    );
    this.linkBox.position.set(0, 0, 1);
    this.linkBox.onClick = () => {
      window.open("assets/resume/resume.pdf", "_blank");
    };
    this.add(this.linkBox);
  }

  addIntroBadge() {
    this.badge = new THREE.Group();

    let serifTextGeom = new THREE.TextGeometry("Scroll or hold to advance.", {
      font: this.timeline.assets.fonts["Schnyder L"],
      size: 26,
      height: 0,
      curveSegments: 6,
    });
    serifTextGeom.center();

    let serifText = new THREE.Mesh(serifTextGeom, this.timeline.textMat);
    serifText.position.set(0, 0, 1);
    this.badge.add(serifText);

    this.badge.position.set(0, 0, 50);
    this.badge.position.y =
      this.timeline.c.size.w < 600
        ? -this.timeline.c.size.h + 90
        : -this.timeline.c.size.h / 2 + 90;
    if (this.timeline.c.size.w < 600) this.badge.scale.set(1.5, 1.5, 1);

    this.add(this.badge);
  }

  addWhooshButton() {
    this.whoosh = new THREE.Group();

    let whooshTexture = new THREE.TextureLoader().load("images/whoooosh.png");
    whooshTexture.magFilter = whooshTexture.minFilter = THREE.LinearFilter;
    let whooshMaterial = new THREE.MeshBasicMaterial({
      map: whooshTexture,
      transparent: true,
      depthWrite: false,
    });
    let whooshGeom = new THREE.PlaneGeometry(1, 1);
    this.circle = new THREE.Mesh(whooshGeom, whooshMaterial);
    this.circle.scale.set(200, 200, 1);
    this.whoosh.add(this.circle);

    let texture = new THREE.TextureLoader().load("images/arrowdown.png");
    texture.anisotropy = this.timeline.renderer.capabilities.getMaxAnisotropy();
    texture.magFilter = texture.minFilter = THREE.LinearFilter;
    let material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    let geom = new THREE.PlaneGeometry(1, 1);
    this.arrow = new THREE.Mesh(geom, material);
    this.arrow.scale.set(90, 90, 1);
    this.arrow.position.z = 20;
    this.whoosh.add(this.arrow);

    this.whoosh.position.set(0, -450, 50);
    if (this.timeline.c.size.w < 600) this.whoosh.scale.set(1.5, 1.5, 1);

    this.add(this.whoosh);
  }
}
