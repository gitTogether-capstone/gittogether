import supabase from "./src/client.js";
//ONLY RUN THIS SEED FILE IF THE DB IS EMPTY, otherwise we will get a lot of duplicate data

//to run this seed file, add "type": "module" to the package.json file
//after running, remove the "type":"module" from package.json

//Generate categories:
// const categories = [
//   {
//     name: "Machine Learning",
//   },
//   {
//     name: "Dev Tools",
//   },
//   {
//     name: "Collab Tools",
//   },
//   {
//     name: "Gaming",
//   },
//   {
//     name: "Data Analytics",
//   },
// ];
// const seed = async () => {
//   const { data, error } = await supabase.from("categories").insert(categories);
//   if (error) {
//     console.log(error);
//   }
// };

// Generate 100 random projects to populate the feed, it assigns each project a random owner, category and BeginnerFriendly value

const seed = async () => {
  const projects = [];

  // const ownerIds = await supabase.from("user").select("id");
  const ownerIds = [
    "72b5c3db-d5fd-4f99-93ce-3ccf9a5d8ef5",
    "12a51642-ba58-4de0-a0e3-5189c65ade71",
    "179b3744-bfd3-49d2-8cfc-851fd52e3559",
    "581f4c5b-771a-48a3-897e-4db2deafc343",
  ];

  const { data, error } = await supabase.from("categories").select("*");

  console.log("seeding projects...");
  for (let i = 1; i <= 100; i++) {
    const beginnerFriendly = Math.floor(Math.random() * 2) ? true : false;

    const randomCategory = data[Math.floor(Math.random() * data.length)].id;
    const newProject = {
      name: `Example Project #${i}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus urna et pharetra pharetra massa massa ultricies. Pulvinar sapien et ligula ullamcorper.",
      beginnerFriendly,
      repoLink: "https://github.com/gitTogether-capstone/gittogether",
      categoryId: randomCategory,
    };

    projects.push(newProject);
    console.log("seeding project ", i);
    await supabase.from("projects").insert([newProject]);
  }

  const resp = await supabase.from("projects").select("*");
  const allProjects = resp.data;

  const languages = await supabase.from("languages").select("id");

  for (const project of allProjects) {
    const randomOwner = ownerIds[Math.floor(Math.random() * ownerIds.length)];
    let randIdx = Math.floor(Math.random() * languages.data.length);
    const randLanguage = languages.data[randIdx];
    console.log("assigning language and owner to project ", project.id);
    await supabase
      .from("projectLanguages")
      .insert({ projectId: project.id, languageId: randLanguage.id });

    await supabase
      .from("projectUser")
      .insert({
        projectId: project.id,
        userId: randomOwner,
        isOwner: true,
        isAccepted: true,
      });
  }

  console.log(`seeded ${allProjects.length} projects`);
};

seed();
