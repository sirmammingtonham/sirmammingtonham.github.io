const sections = {
  intro: {
    texts: [
      {
        text: "COMPSCI STUDENT\nAI ENTHUSIAST\nMAKER",
        font: "SuisseIntl-Bold",
        size: 60,
        x: 0,
        y: 0,
        z: 0,
      },
      {
        text: "ETHAN",
        font: "bruh_outline",
        size: 400,
        x: 0,
        y: 250,
        z: -500,
        segments: 15,
      },
      {
        text: "JOSEPH",
        font: "bruh_outline",
        size: 400,
        x: -60,
        y: -200,
        z: -500,
        segments: 15,
      },
    ],
  },
  about: {
    title: "ABOUT ME",
    texts: [
      {
        text: "I am a fast learning and motivated computer science student\nwith a passion for artificial intelligence.",
        font: "SuisseIntl-Bold",
        size: 26,
        x: 0,
        y: -60,
        z: -900,
      },
      {
        text: "I love making (and breaking) things to learn more about\nhow stuff works.",
        font: "Suisse Intl",
        size: 26,
        x: 0,
        y: -180,
        z: -900,
      },
    ],
  },
  projects: {
    title: "PROJECTS!",
    assets: true,
  },
  experience: {
    title: "EXPERIENCE",
    texts: [
      {
        text: "May 2022 — Aug 2022",
        font: "Suisse Intl",
        size: 26,
        x: 0,
        y: -50,
        z: -800,
      },
      {
        text: "Jan 2022 — May 2022",
        font: "Suisse Intl",
        size: 26,
        x: 0,
        y: -50,
        z: -1600,
      },
      {
        text: "Jan 2020 — Dec 2021",
        font: "Suisse Intl",
        size: 26,
        x: 0,
        y: -50,
        z: -2400,
      },
      {
        text: "Jan 2020 — Dec 2021",
        font: "Suisse Intl",
        size: 26,
        x: 0,
        y: -50,
        z: -3200,
      },
      {
        text: "Jun 2020 — Aug 2021",
        font: "Suisse Intl",
        size: 26,
        x: 0,
        y: -50,
        z: -4000,
      },
      {
        text: "Jun 2018 — Aug 2018",
        font: "Suisse Intl",
        size: 26,
        x: 0,
        y: -50,
        z: -4800,
      },
    ],
    textItems: [
      {
        itemId: "experience/orbitax",
        text: "Machine Learning Engineer @ Orbitax",
        font: "SuisseIntl-Bold",
        isFancy: true,
        size: 26,
        data: {
          caption: `
                - Designed a recommender system for a digital marketplace used by hundreds of
                tax professionals.
                - Built prototype for a natural language generation system utilizing GPT-3
                to automatically generate country-by-country summaries for ESG reporting.
                `,
          link: "",
          font: "Suisse Intl",
          size: 12,
        },
        x: 0,
        y: 25,
        z: -800,
      },
      {
        itemId: "experience/substrate",
        text: "Research Intern @ SubstrateAI",
        font: "SuisseIntl-Bold",
        isFancy: true,
        size: 26,
        data: {
          caption: `
              - Researched usage of neural attention mechanisms in reinforcement learning 
              agents on visual environments, improved performance on certain Atari 
              environments by over 200%.
              - Wrote pipeline to improve training/evaluation efficiency by 5x, deployed 
              parallel GCP compute instances to automatically train and evaluate different 
              agent architecture configurations.
                `,
          link: "",
          font: "Suisse Intl",
          size: 12,
        },
        x: 0,
        y: 25,
        z: -1600,
      },
      {
        itemId: "experience/rpi",
        text: "Researcher @ Rensselaer Polytechnic Institute",
        font: "SuisseIntl-Bold",
        isFancy: true,
        size: 26,
        data: {
          caption: `
                - Developed NLP powered web-scraper to extract vector-borne disease data from 
                thousands of outbreak reports in collaboration with NASA Goddard researchers, 
                published and presented at IEEE Big Data Workshop.
                - Authored research paper on improving tabular data-to-text generation using
                transformers, outperformed previous SOTA by over 10% on certain metrics.
                - Curated tasks and trained baseline models for novel dataset on 
                common-sense inference.
                `,
          link: "",
          font: "Suisse Intl",
          size: 12,
        },
        x: 0,
        y: 25,
        z: -2400,
      },
      {
        itemId: "experience/rcos",
        text: "Project Lead @ Rensselaer Center for Open Source",
        font: "SuisseIntl-Bold",
        isFancy: true,
        size: 26,
        data: {
          caption: `
                - Led a team of over 15 developers from zero full-stack mobile or 
                web dev experience to closed beta for smartrider, an 
                open-source mobile/web app that consolidates all of RPI's
                transportation services into a single location.
                - Overcame a myriad of technical problems created by covid, including 
                the complete restructuring of school transportation systems.
                `,
          link: "",
          font: "Suisse Intl",
          size: 12,
        },
        x: 0,
        y: 25,
        z: -3200,
      },
      {
        itemId: "experience/sei",
        text: "Developer Intern @ Carnegie Mellon SEI",
        font: "SuisseIntl-Bold",
        isFancy: true,
        size: 26,
        data: {
          caption: `
                - Worked with Dr. Amit Vasudevan to develop the next-gen uberSpark toolkit 
                for compositional verification of commodity system software.
                - Developed hardware model abstraction to aid in automated program 
                verification of hypervisor firmware.
                - Converted open-source firmwares (TF-A/OpenSBI) to use uberSpark.
                `,
          link: "",
          font: "Suisse Intl",
          size: 12,
        },
        x: 0,
        y: 25,
        z: -4000,
      },
      {
        itemId: "experience/dn",
        text: "Summer Research Intern @ Deep North",
        font: "SuisseIntl-Bold",
        isFancy: true,
        size: 26,
        data: {
          caption: `
                - Worked to develop and train facial recognition models for 
                the WIDER Face Challenge 2018, scoring in the top 3 globally.
                `,
          link: "",
          font: "Suisse Intl",
          size: 12,
        },
        x: 0,
        y: 25,
        z: -4800,
      },
    ],
  },
  publications: {
    title: "PUBLICATIONS",
    texts: [
      {
        text: "in Italian Journal of Computational Linguistics Special Issue",
        font: "Schnyder L",
        size: 16,
        x: 0,
        y: -70,
        z: -800,
      },
      {
        text: "in 2021 IEEE International Conference on Big Data",
        font: "Schnyder L",
        size: 16,
        x: 0,
        y: -70,
        z: -1600,
      },
      {
        text: "in Thirteenth International Conference on Language Resources and Evaluation",
        font: "Schnyder L",
        size: 16,
        x: 0,
        y: -70,
        z: -2400,
      },
    ],
    textItems: [
      {
        itemId: "publications/d2t",
        text: "Improving Data-to-Text Generation via\nPreserving High-Frequency Phrases and Fact-Checking",
        font: "Schnyder L",
        isFancy: true,
        size: 20,
        data: {
          caption: `
              Joseph, Ethan, Julian Lioanag, and Mei Si. (2021)
              IJCoL. Italian Journal of Computational Linguistics 7, no. 7-1, 2 (2021): 223-244.
              `,
          link: "https://journals.openedition.org/ijcol/909",
          font: "Suisse Intl",
          size: 9,
        },
        x: 0,
        y: 0,
        z: -800,
      },
      {
        itemId: "publications/scraping",
        text: "Scraping Unstructured Data to Explore the Relationship\nbetween Rainfall Anomalies and Vector-Borne Disease Outbreaks",
        font: "Schnyder L",
        isFancy: true,
        size: 20,
        data: {
          caption: `
              Joseph, Ethan, Thilanka Munasinghe, Heidi Tubbs, Bhaskar Bishnoi, and Assaf Anyamba. (2021)
              In 2021 IEEE International Conference on Big Data (Big Data), pp. 4156-4164. IEEE, 2021.
              `,
          link: "https://ieeexplore.ieee.org/abstract/document/9671853",
          font: "Suisse Intl",
          size: 12,
        },
        x: 0,
        y: 0,
        z: -1600,
      },
      {
        itemId: "publications/sct",
        text: "A Corpus for Commonsense Inference in Story Cloze Test",
        font: "Schnyder L",
        isFancy: true,
        size: 20,
        data: {
          caption: `
          Yao, Bingsheng, Joseph, Ethan, Lioanag, Julian, & Si, Mei. (2022)
          In Proceedings of the Thirteenth International Conference on Language Resources 
          and Evaluation (LREC 2022) (pp. 3500-3508).
          `,
          link: "http://www.lrec-conf.org/proceedings/lrec2022/pdf/2022.lrec-1.375.pdf",
          font: "Suisse Intl",
          size: 12,
        },
        x: 0,
        y: 0,
        z: -2400,
      },
    ],
  },
  education: {
    title: "EDUCATION",
    texts: [
      {
        text: "Master's of Engineering in Computer Science",
        font: "Schnyder L",
        size: 20,
        x: 0,
        y: -50,
        z: -800,
      },
      {
        text: "Aug 2022 - Expected May 2023",
        font: "Schnyder L",
        size: 20,
        x: 0,
        y: -100,
        z: -800,
      },
      {
        text: "Bachelor's of Science in Computer Science",
        font: "Schnyder L",
        size: 20,
        x: 0,
        y: -50,
        z: -1600,
      },
      {
        text: "Aug 2019 - Dec 2021",
        font: "Schnyder L",
        size: 20,
        x: 0,
        y: -100,
        z: -1600,
      },
      {
        text: "summa cum laude",
        font: "Schnyder L",
        size: 20,
        x: 0,
        y: -150,
        z: -1600,
      },
    ],
    textItems: [
      {
        itemId: "education/cornell",
        text: "Cornell University (Cornell Tech)",
        font: "Schnyder L",
        isFancy: true,
        size: 40,
        data: {
          caption: `
              `,
          link: "",
        },
        x: 0,
        y: 50,
        z: -800,
      },
      {
        itemId: "education/rpi",
        text: "Rensselaer Polytechnic Institute",
        font: "Schnyder L",
        isFancy: true,
        size: 40,
        data: {
          caption: `
            GPA: 3.90/4.00
            Relevant Coursework:
            - Intro to Algorithms
            - Data Analytics
            - Learning and Advanced Game AI
            - Cognitive Computing
            - Undergraduate Research
            `,
          link: "",
        },
        x: 0,
        y: 50,
        z: -1600,
      },
    ],
  },
  skills: {
    title: "SKILLS",
    texts: [
      {
        text: "My most valuable skill is my ability to learn things quickly.",
        font: "Schnyder L",
        size: 20,
        x: 0,
        y: 150,
        z: -600,
      },
      {
        text: "Click an icon to see more.",
        font: "Schnyder L",
        size: 14,
        x: 0,
        y: -150,
        z: -650,
      },
    ],
    textItems: [
      {
        itemId: "skills/languages",
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
        x: -50,
        y: 0,
        z: -700,
        openY: 100,
      },
      {
        itemId: "skills/frameworks",
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
        x: 50,
        y: 0,
        z: -800,
        openY: 100,
      },
      {
        itemId: "skills/soft",
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
        x: -50,
        y: -100,
        z: -1000,
        openY: 100,
      },
      {
        itemId: "skills/tools",
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
        x: 50,
        y: -100,
        z: -900,
        openY: 100,
      },
    ],
  },
  contact: {
    title: [
      ["CONTACT", 150],
      ["ME!", -150],
    ],
    texts: [
      {
        text: "Click any of the links on the\nbottom right to get in touch!",
        font: "Schnyder L",
        size: 32,
        x: 0,
        y: 0,
        z: -600,
      },
    ],
  },
  end: {
    title: null,
    texts: [
      {
        text: "THANKS FOR STOPPING BY",
        font: "SuisseIntl-Bold",
        size: 60,
        x: 0,
        y: 0,
        z: 0,
      },
      {
        text: "E",
        font: "icons",
        size: 580,
        x: 0,
        y: 0,
        z: -525,
        segments: 15,
      },
    ],
  },
};

export default sections;
