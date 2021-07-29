import * as THREE from "three";
import frag from "../shaders/item.frag";
import vert from "../shaders/default.vert";

export class ImageItem extends THREE.Group {
  constructor(
    opts = {
      assetId,
      timeline,
      texture,
      data,
      page,
      itemIndex,
      itemIndexTotal,
      x,
      y,
      z,
    }
  ) {
    super();
    Object.assign(this, opts);
    this.isText = false;
    this.create();
  }

  create() {
    this.uniforms = {
      time: { type: "f", value: 1.0 },
      fogColor: { type: "c", value: this.timeline.scene.fog.color },
      fogNear: { type: "f", value: this.timeline.scene.fog.near },
      fogFar: { type: "f", value: this.timeline.scene.fog.far },
      texture: { type: "t", value: this.texture },
      opacity: { type: "f", value: 1.0 },
      progress: { type: "f", value: 0.0 },
      gradientColor: { type: "vec3", value: new THREE.Color(0x1b42d8) },
    };

    this.geometry = new THREE.PlaneGeometry(1, 1);
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      fragmentShader: frag,
      vertexShader: vert,
      fog: true,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(this.texture.size.x, this.texture.size.y, 1);

    // updates size of meshes after texture has been loaded
    this.texture.onUpdate = () => {
      if (
        this.mesh.scale.x !== this.texture.size.x &&
        this.mesh.scale.y !== this.texture.size.y
      ) {
        this.mesh.scale.set(this.texture.size.x, this.texture.size.y, 1);
        this.texture.onUpdate = null;
      }
    };

    let align = (this.itemIndexTotal ?? 0) % 4,
      pos = new THREE.Vector2();

    if (align === 0) pos.set(-350, 350); // bottom left
    if (align === 1) pos.set(350, 350); // bottom right
    if (align === 2) pos.set(350, -350); // top right
    if (align === 3) pos.set(-350, -350); // top left

    this.align = align;
    this.position.set(
      this.x ?? pos.x,
      this.y ?? pos.y,
      this.z ?? this.itemIndex * -300 - 200
    );

    this.origPos = new THREE.Vector2(this.x ?? pos.x, this.y ?? pos.y);
    this.openPos = new THREE.Vector2(0, 0);

    this.add(this.mesh);

    this.addCaption();

    this.timeline.itemMeshes.push(this.mesh);

    if (this.texture.mediaType === "video") {
      this.timeline.videoItems.push(this.mesh);
    }
  }

  addCaption() {
    if (this.data.caption === "" && this.data.link === "") return;

    if (this.data.caption !== "") {
      let captionGeom = new THREE.TextBufferGeometry(this.data.caption, {
        font: this.timeline.assets.fonts["SuisseIntl-Bold"],
        size: 18,
        height: 0,
        curveSegments: 4,
      }).center();

      this.caption = new THREE.Mesh(captionGeom, this.timeline.captionTextMat);
      let yOffset = 25;
      if (this.assetId === "about/me.jpg") yOffset = 170;
      this.caption.position.set(0, -(this.mesh.scale.y / 2 + yOffset), 0);
      this.caption.visible = false;

      this.add(this.caption);
    }
  }
}

export class TextItem extends THREE.Group {
  constructor(
    opts = { timeline, text, font, size, data, page, x, y, z, isFancy }
  ) {
    super();
    Object.assign(this, opts);
    this.isText = true;
    this.create();
  }

  create() {
    this.uniforms = {
      time: { type: "f", value: 1.0 },
      fogColor: { type: "c", value: this.timeline.scene.fog.color },
      fogNear: { type: "f", value: this.timeline.scene.fog.near },
      fogFar: { type: "f", value: this.timeline.scene.fog.far },
      // texture: { type: 't', value: this.texture },
      opacity: { type: "f", value: 1.0 },
      progress: { type: "f", value: 0.0 },
      gradientColor: { type: "vec3", value: new THREE.Color(0x1b42d8) },
    };

    let textGeom = new THREE.TextBufferGeometry(this.text, {
      font: this.timeline.assets.fonts[this.font],
      size: this.size,
      height: 0,
      curveSegments: this.segments ?? 6,
    }).center();

    let textSize = new THREE.Vector3();
    textGeom.boundingBox.getSize(textSize);

    let text = new THREE.Mesh(textGeom, this.timeline.textItemMat);
    this.add(text);

    this.geometry = new THREE.PlaneBufferGeometry(1, 1);
    this.material = new THREE.MeshBasicMaterial({
      alphaTest: 0,
      visible: false,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.scale.set(
      textSize.x,
      this.isFancy ? textSize.y + 250 : textSize.y,
      1
    );

    // case for fancy text (i.e. not the icons)
    if (this.isFancy) {
      this.mesh.position.set(0, -100, 0);
      let underline = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(textSize.x, 1),
        this.timeline.textItemUnderlineMat
      );
      underline.position.set(0, -40, 10);
      this.add(underline);
    }

    this.position.set(this.x, this.y, this.z);
    this.origPos = new THREE.Vector3(this.x, this.y, this.z);

    this.add(this.mesh);

    this.addCaption();

    this.timeline.itemMeshes.push(this.mesh);
  }

  addCaption() {
    if (!this.data) return;
    if (this.data.caption === "" && this.data.link === "") return;

    if (this.data.caption !== "") {
      let captionGeom = new THREE.TextBufferGeometry(this.data.caption, {
        font: this.timeline.assets.fonts[
          this.isFancy ? "Schnyder L" : "SuisseIntl-Bold"
        ],
        size: 18,
        height: 0,
        curveSegments: 4,
      }).center();

      this.caption = new THREE.Mesh(captionGeom, this.timeline.captionTextMat);
      let textSize = new THREE.Vector3();
      captionGeom.boundingBox.getSize(textSize);

      this.caption.position.set(0, -textSize.y / 2 - 75, 0);
      this.caption.visible = false;

      this.add(this.caption);
    }
  }
}
