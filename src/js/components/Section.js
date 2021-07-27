import * as THREE from "three";
import SVGLoader from "three-svg-loader";
import { MeshLine, MeshLineMaterial } from "three.meshline";
import greenscreen from "../shaders/greenscreen.frag";
import vert from "../shaders/default.vert";
import { TweenMax } from "gsap";
import Item from './Item'

export default class Section extends THREE.Group {
  constructor(opts = { timeline, section }) {
    super();
    Object.assign(this, opts);

    if (this.section === "intro") this.createIntroSection();
    else if (this.section === "end") this.createEndSection();
    else if (this.section === "resume") this.createResumeSection();
    else this.create();
  }

  create() {
    let textGeom = new THREE.TextGeometry(
      this.timeline.months[this.section].name,
      {
        font: this.timeline.assets.fonts["Schnyder L"],
        size: 200,
        height: 0,
        curveSegments: 10,
      }
    ).center();

    let monthName = new THREE.Mesh(textGeom, this.timeline.textMat);
    monthName.position.set(
      this.timeline.months[this.section].offset || 0,
      0,
      0
    );
    this.add(monthName);
  }

  createIntroSection() {
    let sansTextGeom = new THREE.TextGeometry(
      "COMPSCI STUDENT\nAI ENTHUSIAST\nMAKER",
      {
        font: this.timeline.assets.fonts["SuisseIntl-Bold"],
        size: 60,
        height: 0,
        curveSegments: 4,
      }
    ).center();

    let sansText = new THREE.Mesh(sansTextGeom, this.timeline.textMat);
    // sansText.position.set( 0, 150, 0 )
    this.add(sansText);

    let serifTextGeom = new THREE.TextGeometry("ETHAN", {
      font: this.timeline.assets.fonts["bruh_outline"],
      size: 400,
      height: 0,
      curveSegments: 15,
    }).center();

    let serifText = new THREE.Mesh(serifTextGeom, this.timeline.textOutlineMat);
    serifText.position.set(0, 250, -500);
    this.add(serifText);

    let serifTextGeom2 = new THREE.TextGeometry("JOSEPH", {
      font: this.timeline.assets.fonts["bruh_outline"],
      size: 400,
      height: 0,
      curveSegments: 15,
    }).center();

    let serifText2 = new THREE.Mesh(
      serifTextGeom2,
      this.timeline.textOutlineMat
    );
    serifText2.position.set(-60, -200, -500);
    this.add(serifText2);

    this.addIntroBadge();
  }

  addIntroBadge() {
    this.badge = new THREE.Group();

    // let texture = new THREE.TextureLoader().load( 'images/highlights.png' )
    // texture.magFilter = texture.minFilter = THREE.LinearFilter
    // let material = new THREE.MeshBasicMaterial( { map: texture, transparent: true } )
    // let geom = new THREE.PlaneGeometry( 1, 1 )
    // this.circle = new THREE.Mesh( geom, material )
    // this.circle.scale.set( 200, 200, 1 )
    // this.badge.add( this.circle )

    let serifTextGeom = new THREE.TextGeometry(
      "Scroll or hold mouse to advance.",
      {
        font: this.timeline.assets.fonts["Schnyder L"],
        size: 26,
        height: 0,
        curveSegments: 6,
      }
    );

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

  createEndSection() {
    let sansTextGeom = new THREE.TextGeometry("THANKS FOR STOPPING BY", {
      font: this.timeline.assets.fonts["SuisseIntl-Bold"],
      size: 60,
      height: 0,
      curveSegments: 4,
    }).center();

    let sansText = new THREE.Mesh(sansTextGeom, this.timeline.textMat);
    this.add(sansText);

    let serifTextGeom = new THREE.TextGeometry("END", {
      font: this.timeline.assets.fonts["Schnyder_Edit Outline"],
      size: 580,
      height: 0,
      curveSegments: 15,
    }).center();

    let serifText = new THREE.Mesh(serifTextGeom, this.timeline.textOutlineMat);
    serifText.position.set(0, 0, -300);
    this.add(serifText);

    let geometry = new THREE.PlaneGeometry(1, 1);
    let material = new THREE.ShaderMaterial({
      uniforms: {
        fogColor: { type: "c", value: this.timeline.scene.fog.color },
        fogNear: { type: "f", value: this.timeline.scene.fog.near },
        fogFar: { type: "f", value: this.timeline.scene.fog.far },
        texture: {
          type: "t",
          value: this.timeline.assets.textures["end"]["wave.mp4"],
        },
      },
      fragmentShader: greenscreen,
      vertexShader: vert,
      fog: true,
      transparent: true,
    });

    let mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(700, 700, 1);
    mesh.position.set(0, 0, -200);

    this.timeline.videoItems.push(mesh);

    this.add(mesh);

    this.addWhooshButton();
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

  createResumeSection() {
    this.position.set(0, 2000 / this.timeline.scene.scale.y, 0);
    this.visible = false;

    let material = new THREE.MeshBasicMaterial( { map: this.timeline.assets.textures['resume']['resume.png'], transparent: true } )
    let geom = new THREE.PlaneGeometry( 1, 1 )
    let resume = new THREE.Mesh( geom, material )
    resume.scale.set( 612, 792, 1 )
    resume.position.set( 0, 0, 0 )
    this.add( resume )

    // for raycasting so it doesn't just pick up on letters
    this.linkBox = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(612, 792),
      new THREE.MeshBasicMaterial({ alphaTest: 0, visible: false })
    );
    this.linkBox.position.set(0, 0, 1);
    this.linkBox.onClick = () => {
      window.open("assets/resume/resume.pdf", "_blank");
    };
    this.add(this.linkBox);
  }
}
