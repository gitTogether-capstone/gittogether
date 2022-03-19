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
  const ownerIds = [
    "179b3744-bfd3-49d2-8cfc-851fd52e3559",
    "581f4c5b-771a-48a3-897e-4db2deafc343",
    "12a51642-ba58-4de0-a0e3-5189c65ade71",
    "72b5c3db-d5fd-4f99-93ce-3ccf9a5d8ef5",
  ];
  const { data, error } = await supabase.from("categories").select("*");
  console.log(data);

  for (let i = 1; i <= 100; i++) {
    const beginnerFriendly = Math.floor(Math.random() * 2) ? true : false;
    const randomOwner = ownerIds[Math.floor(Math.random() * 4)];
    const randomCategory = data[Math.floor(Math.random() * data.length)].id;

    projects.push({
      name: `Example Project #${i}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus urna et pharetra pharetra massa massa ultricies. Pulvinar sapien et ligula ullamcorper.",
      beginnerFriendly,
      ownerId: randomOwner,
      repoLink: "https://github.com/gitTogether-capstone/gittogether",
      categoryId: randomCategory,
    });
  }

  console.log("seeding projects...");
  const resp = await supabase.from("projects").insert(projects);
  const allProjects = resp.data;

  console.log(`seeded ${allProjects.length} projects`);
};

seed();
