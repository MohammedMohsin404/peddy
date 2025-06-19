console.log("Js Connected");

// APIs
// The following APIs are available in Peddy:

// Fetch All Pets

// Endpoint: https://openapi.programming-hero.com/api/peddy/pets
// Description: Retrieves a list of all available pets for adoption. The data includes details like pet name, type, age, and adoption status.
// Fetch Pet Details by ID

// Endpoint:https://openapi.programming-hero.com/api/peddy/pet/pet-id

// Example: https://openapi.programming-hero.com/api/peddy/pet/1

// Description: Fetches detailed information for a specific pet based on its ID. This can be used to view additional information about the pet such as vacination history, description

// Fetch All Pet Categories

// Endpoint: https://openapi.programming-hero.com/api/peddy/categories

// Description: Fetches a list of all pet categories available in the platform, such as dogs, cats, rabbit , bird, etc.

// Fetch Pets by Category

// Endpoint: https://openapi.programming-hero.com/api/peddy/category/categoryName

// Example: https://openapi.programming-hero.com/api/peddy/category/dog

// Description: Fetches data of pets under a specific category, in this case, dogs. This can be used to filter pets based on their category.

const skeleton = document.querySelector("#skeleton");
const petContainer = document.querySelector("#pets");
let allPets =[]
skeleton.classList.remove("hidden");

const loadAllPets = () => {
  setTimeout(() => {
    skeleton.classList.add("hidden");
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((res) => res.json())
      .then((data) => {allPets=data.pets, showAllPets(allPets)})
      .catch((error) => console.log(error));
  }, 2000);
};
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => {
      showCategories(data.categories);
    })
    .catch((error) => console.log(error));
};

const loadPetsByCategory = (categoryName) => {
  petContainer.innerHTML = ` `;
  skeleton.classList.remove("hidden");

  setTimeout(() => {
    petContainer.innerHTML = ` `;
    skeleton.classList.add("hidden");
    fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
    )
      .then((res) => res.json())
       .then((data) => {allPets = data.data, showAllPets(allPets)})
      .catch((error) => console.log(error));
  }, 2000);
};

const buttonCategory = (categoryName)=> {
  // Remove active class from all category buttons
  document.querySelectorAll(".btn-categories").forEach((btn) => {
    btn.classList.remove("bg-[#0E7A81]", "text-white");
    btn.classList.add("bg-transparent", "text-black");
  });

  // Add active class to the clicked button
  const buttons = document.querySelectorAll(".btn-categories");
  buttons.forEach((btn) => {
    if (btn.textContent.trim() === categoryName) {
      btn.classList.remove("bg-transparent", "text-black");
      btn.classList.add("bg-[#0e79813e]", "border-[#0E7A81]", "rounded-full");
    }
  });

  // Your existing logic (optional):
  loadPetsByCategory(categoryName);
}

const buttonLike = (img) => {
  const likeContainer = document.querySelector("#likeContainer");
  likeContainer.innerHTML += `<img src="${img}" alt="" />`;

};

const showCategories = (categories) => {
  categories.forEach((category) => {
    document.querySelector("#categories").innerHTML += ` 
       <button onclick="buttonCategory('${category.category}')"
                    class="flex btn-categories items-center space-x-4 px-20 py-10 bg-transparent btn  hover:bg-[#0e79813e] hover:border-[#0E7A81] hover:rounded-full ">
                    <img class="w-10" src="${category.category_icon}" alt="${category.category} ${category.id}">
                    <p class="text-xl font-bold">${category.category}</p>
                </button>`;
  });
};

const showPetDetails = async (id) => {
  const modal = document.getElementById("my_modal_5");
  const modalContent = document.getElementById("modal_content");

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    );
    const data = await res.json();
    const pet = data.petData;

    modalContent.innerHTML = `
     <div class="flex flex-col  rounded-2xl  space-y-6">
                             <img class="rounded-2xl" src="${pet.image}" alt="">

                           <h3 class="text-xl font-bold text-left">${pet.pet_name}</h3>
                        <div class="flex space-x-32 border-[#13131349] ">
                        <div class="space-y-2">  
                        <div class="flex space-x-4">
                              <img src="./images/breed.png" alt="Breed">
                               <p>Breed: ${pet.breed} </p>
                           </div>
                                 <div class="flex space-x-4">
                              <img src="./images/gender.png" alt="Breed">
                                <p>Gender: ${pet.gender} </p>
                           </div>
                          <div class="flex space-x-4">
                              <img src="./images/gender.png" alt="Breed">
                                <p>Vaccinated Status: ${pet.vaccinated_status} </p>
                           </div>
                           </div>
<div class="space-y-2">      <div class="flex space-x-4">
                              <img src="./images/dob.png" alt="Breed">
                              <p>Birth: ${pet.date_of_birth} </p>
                           </div>

                    

                           <div class="flex space-x-4">
                               <img src="./images/price.png" alt="Breed">
                                <p>Price: ${pet.price} </p>
                            </div>
                        </div>

                    
                        </div>
                            <h4 class="text-left"> Details Information </h4>
                        <p class="text-basic text-justify">${pet.pet_details}</p>

                    
    `;

    modal.showModal(); // Show the DaisyUI modal
  } catch (error) {
    modalContent.innerHTML = `<p class="text-red-500">Failed to load pet details.</p>`;
    modal.showModal();
    console.error(error);
  }
};

const sortByPrice = () => {
  const sortedPets = [...allPets].sort((a, b) => a.price - b.price);
   petContainer.innerHTML =""
  showAllPets(sortedPets);
};

// Add event listener to sort button
document.getElementById('button-sort').addEventListener('click', sortByPrice);

const showAllPets = (pets) => {

    console.log(pets);
      
  pets != ""
    ? pets.forEach((pet) => {
        petContainer.innerHTML += `<div class="flex flex-col border-[#5A5A5A] border  rounded-2xl p-5 space-y-6">
                             <img class="rounded-2xl" src="${pet.image}" alt="">

                           <h3 class="text-xl font-bold text-left">${pet.pet_name}</h3>
                        <div class="border-b-2 border-[#13131349] space-y-2">
                          <div class="flex space-x-4">
                              <img src="./images/breed.png" alt="Breed">
                               <p>Breed: ${pet.breed} Golder retriever</p>
                           </div>


                          <div class="flex space-x-4">
                              <img src="./images/dob.png" alt="Breed">
                              <p>Birth: ${pet.date_of_birth} </p>
                           </div>

                          <div class="flex space-x-4">
                              <img src="./images/gender.png" alt="Breed">
                                <p>Gender: ${pet.gender} </p>
                           </div>

                           <div class="flex space-x-4">
                               <img src="./images/price.png" alt="Breed">
                                <p>Price: ${pet.price} </p>
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <div  onclick="buttonLike('${pet.image}')" class="btn buttonLike border-[#0e798135]  p-4">
                               <img src="./images/like.png" alt="Like">
                           </div>
                          <button class="btn text-xl text-[#0E7A81] border-[#0e798135] p-4">
                              Adopt
                          </button>
                          <button onclick="showPetDetails(${pet.petId})" class="btn text-xl text-[#0E7A81] border-[#0e798135] p-4">
                               Details
                           </button>
                       </div>
                   </div>

              `;
      })
    : (petContainer.innerHTML += `<div class="grid col-span-4 items-center justify-center"><img  src="../images/error.webp" alt="" /></div>`);
};
loadCategories();
loadAllPets();
