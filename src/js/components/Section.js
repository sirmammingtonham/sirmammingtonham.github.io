import * as THREE from "three";
import { ImageItem, TextItem } from "./Item";

export default class Section extends THREE.Group {
  constructor(opts = { timeline, section }) {
    super();
    Object.assign(this, opts);

    switch (this.section) {
      case "intro": {
        this.createIntroSection();
        break;
      }
      case "about": {
        this.createAboutSection();
        break;
      }
      case "projects": {
        this.createProjectsSection();
        break;
      }
      case "resume": {
        this.createResumeSection();
        break;
      }
      case "experience": {
        this.createExperienceSection();
        break;
      }
      case "publications": {
        this.createPublicationsSection();
        break;
      }
      case "education": {
        this.createEducationSection();
        break;
      }
      case "skills": {
        this.createSkillsSection();
        break;
      }
      case "contact": {
        this.createContactSection();
        break;
      }
      case "end": {
        this.createEndSection();
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

  createIntroSection() {
    this.addText({
      text: "COMPSCI STUDENT\nAI ENTHUSIAST\nMAKER",
      font: "SuisseIntl-Bold",
      size: 60,
      x: 0,
      y: 0,
      z: 0,
    });

    this.addText({
      text: "ETHAN",
      font: "bruh_outline",
      size: 400,
      x: 0,
      y: 250,
      z: -500,
      segments: 15,
    });

    this.addText({
      text: "JOSEPH",
      font: "bruh_outline",
      size: 400,
      x: -60,
      y: -200,
      z: -500,
      segments: 15,
    });

    this.addIntroBadge();
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

  createAboutSection() {
    this.addTitle("ABOUT ME");

    this.addText({
      text: "I am a fast learning and motivated computer science student\nwith a passion for artificial intelligence.",
      font: "SuisseIntl-Bold",
      size: 26,
      x: 0,
      y: -60,
      z: -700,
    });
    this.addText({
      text: "I love making (and breaking) things to learn more about\nhow stuff works.",
      font: "Suisse Intl",
      size: 26,
      x: 0,
      y: -180,
      z: -700,
    });

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
  }

  createProjectsSection() {
    this.addTitle("PROJECTS!");

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

  createExperienceSection() {
    this.addTitle("EXPERIENCE");

    // header sections
    this.addText({
      text: "RL and NLP Research @ Rensselaer Polytechnic Institute\nJan 2020 — Present",
      font: "SuisseIntl-Bold",
      size: 26,
      x: 0,
      y: 100,
      z: -700,
    });

    this.addText({
      text: "Project Lead @ Rensselaer Center for Open Source\nJan 2020 — Present",
      font: "SuisseIntl-Bold",
      size: 26,
      x: 0,
      y: 100,
      z: -1500,
    });

    this.addText({
      text: "Systems Research, Developer @ Carnegie Mellon SEI\nJun 2020 — Present",
      font: "SuisseIntl-Bold",
      size: 26,
      x: 0,
      y: 100,
      z: -2300,
    });

    this.addText({
      text: "Developer @ Skywind & Skyblivion Mod Project\nJun 2020 — Present",
      font: "SuisseIntl-Bold",
      size: 20,
      x: 0,
      y: 100,
      z: -3100,
    });

    this.addText({
      text: "Face Detection Research @ Deep North AI\nJun 2018 — Aug 2018",
      font: "SuisseIntl-Bold",
      size: 26,
      x: 0,
      y: 100,
      z: -3900,
    });

    // body sections
    this.addText({
      text: `
    • Working with Dr. Mei Si to research
      Natural Language Processing and Reinforcement Learning.
    • Co-authored research paper on tabular data-to-text generation
      using transformer neural networks, awaiting publication.
    • Currently working on using NLP and RL to generate fully
      tailorable video games, including dialogue agents
      and a cohesive storyline.`,
      font: "Suisse Intl",
      size: 20,
      x: 0,
      y: -150,
      z: -800,
    });
    this.addText({
      text: `
    • Founder and project lead for smartrider: the all-in-one RPI
      transportation app for iOS, Android, and web built with Flutter.
    • Led team of over 15 developers from zero mobile dev experience to
      working beta in 4 semesters.
    • Currently leading team to launch by Fall 2021.`,
      font: "Suisse Intl",
      size: 20,
      x: 0,
      y: -100,
      z: -1600,
    });
    this.addText({
      text: `
    • Working with Dr. Amit Vasudevan to develop the next-gen uberSpark
      toolkit for compositional verification of commodity system software.
    • Also porting the uber extensible microhypervisor framework (uxmhf) to
      use the next-gen toolkit, involves development in C and some ARM.
    • Co-authoring research paper on using the uberSpark framework.`,
      font: "Suisse Intl",
      size: 20,
      x: 0,
      y: -100,
      z: -2400,
    });
    this.addText({
      text: `
    • Joined team of over 100 developers trying to port Bethesda’s video games
      Morrowind and Oblivion into the Skyrim Engine.
    • In charge of Spellmaking system, involves C++ reverse-engineering and
      Flash/Actionscript UI development.`,
      font: "Suisse Intl",
      size: 20,
      x: 0,
      y: -50,
      z: -3200,
    });
    this.addText({
      text: `
    • Worked with researcher to develop, train, and evaluate face detection
      models using the WIDER Face Dataset of almost 400,000 unique faces.
    • Helped develop detection model that scored in the top 3
      globally for the WIDER Face Challenge 2018`,
      font: "Suisse Intl",
      size: 20,
      x: 0,
      y: -75,
      z: -4000,
    });
  }

  createPublicationsSection() {
    this.addTitle("PUBLICATIONS");
    this.addText({
      text: "work in progress",
      font: "Schnyder L",
      size: 20,
      x: 0,
      y: 0,
      z: -400,
    });
  }

  createEducationSection() {
    this.addTitle("EDUCATION");

    this.timeline.items["education/rpi"] = new TextItem({
      timeline: this.timeline,
      text: "Rensselaer Polytechnic Institute",
      font: "Schnyder L",
      isFancy: true,
      size: 40,
      data: {
        caption: `
Bachelors of Science in Computer Science
GPA: 3.87/4.00
Expected: Spring 2022
Relevant Coursework:
- Intro to Algorithms
- Data Analytics
- Learning and Advanced Game AI
- Cognitive Computing
- Undergraduate Research
`,
        link: "",
      },
      page: this.section,
      x: 0,
      y: 50,
      z: -800,
    });
    this.add(this.timeline.items["education/rpi"]);

    this.addText({
      text: "Rensselaer Leadership Award",
      font: "Schnyder L",
      size: 20,
      x: 0,
      y: -50,
      z: -800,
    });
    this.addText({
      text: "Dean's Honor List, All Semesters",
      font: "Schnyder L",
      size: 20,
      x: 0,
      y: -100,
      z: -800,
    });
    this.addText({
      text: "Eagle Scout",
      font: "Schnyder L",
      size: 20,
      x: 0,
      y: -150,
      z: -800,
    });
  }

  createSkillsSection() {
    this.addTitle("SKILLS");
    this.addText({
      text: "My most valuable skill is my ability to learn things quickly.",
      font: "Schnyder L",
      size: 20,
      x: 0,
      y: 150,
      z: -600,
    });
    this.addText({
      text: "Click an icon to see more.",
      font: "Schnyder L",
      size: 14,
      x: 0,
      y: -150,
      z: -650,
    });

    this.timeline.items["skills/languages"] = new TextItem({
      timeline: this.timeline,
      text: "A",
      font: "icons",
      size: 60,
      data: {
        caption: `
Languages:
- Python
- C++
- C
- Java
- JavaScript, TypeScript
- Dart
- HTML/CSS/SASS
`,
        link: "",
      },
      page: this.section,
      x: -50,
      y: 0,
      z: -700,
      openY: 100,
    });
    this.add(this.timeline.items["skills/languages"]);

    this.timeline.items["skills/frameworks"] = new TextItem({
      timeline: this.timeline,
      text: "B",
      font: "icons",
      size: 60,
      data: {
        caption: `
Frameworks:
- Flutter
- PyTorch
- Tensorflow
- Pandas
- Scikit-Learn
- Matplotlib
- three.js
`,
        link: "",
      },
      page: this.section,
      x: 50,
      y: 0,
      z: -800,
      openY: 100,
    });
    this.add(this.timeline.items["skills/frameworks"]);

    this.timeline.items["skills/soft"] = new TextItem({
      timeline: this.timeline,
      text: "C",
      font: "icons",
      size: 60,
      data: {
        caption: `
Essential Skills:
- Problem-Solver
- Adaptable
- Creative
- Leader
- Self-Motivated
`,
        link: "",
      },
      page: this.section,
      x: -50,
      y: -100,
      z: -1000,
      openY: 100,
    });
    this.add(this.timeline.items["skills/soft"]);

    this.timeline.items["skills/tools"] = new TextItem({
      timeline: this.timeline,
      text: "D",
      font: "icons",
      size: 60,
      data: {
        caption: `
Tools:
- Git
- Google Cloud
- Docker
- Firebase
- Webpack
- Adobe Illustrator
`,
        link: "",
      },
      page: this.section,
      x: 50,
      y: -100,
      z: -900,
      openY: 100,
    });
    this.add(this.timeline.items["skills/tools"]);
  }

  createContactSection() {
    this.addTitle("CONTACT", 150);
    this.addTitle("ME!", -150);

    this.addText({
      text: "Click any of the links on the\nbottom right to get in touch!",
      font: "Schnyder L",
      size: 32,
      x: 0,
      y: 0,
      z: -600,
    });
  }

  createEndSection() {
    this.addText({
      text: "THANKS FOR STOPPING BY",
      font: "SuisseIntl-Bold",
      size: 60,
      x: 0,
      y: 0,
      z: 0,
    });

    this.addText({
      text: "E",
      font: "icons",
      size: 580,
      x: 0,
      y: 0,
      z: -525,
      segments: 15,
    });

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

    let material = new THREE.MeshBasicMaterial({
      map: this.timeline.assets.textures["resume"]["resume.png"],
      transparent: true,
    });
    let geom = new THREE.PlaneGeometry(1, 1);
    let resume = new THREE.Mesh(geom, material);
    resume.scale.set(612, 792, 1);
    resume.position.set(0, 0, 0);
    this.add(resume);

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
