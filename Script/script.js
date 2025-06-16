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

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.categories))
    .catch((error) => console.log(error));
};

const showCategories = (categories) => {
  categories.forEach((category) => {
    document.querySelector("#categories").innerHTML += `    <div
                    class="flex btn-categories items-center space-x-4 px-20 py-10 bg-transparent btn border-[#0E7A81] hover:bg-[#0e79813e] hover:border-[#0E7A81] hover:rounded-full ">
                    <img class="w-10" src="${category.category_icon}" alt="${category.category}">
                    <p class="text-xl font-bold">${category.category}</p>
                </div>`;
  });
};

const loadAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => showAllPets(data.pets))
    .catch((error) => console.log(error));
};

const showAllPets = (pets) => {
  pets.forEach((pet) => {
    document.querySelector(
      "#pets"
    ).innerHTML += `<div class="flex flex-col border-[#5A5A5A] border  rounded-2xl p-5 space-y-6">
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
                                <div class="btn border-[#0e798135] p-4">
                                    <img src="./images/like.png" alt="Like">
                                </div>
                                <button class="btn text-xl text-[#0E7A81] border-[#0e798135] p-4">
                                    Adopt
                                </button>
                                <button class="btn text-xl text-[#0E7A81] border-[#0e798135] p-4">
                                    Details
                                </button>
                            </div>
                        </div> `;
  });
};

loadCategories();
loadAllPets();

const btnCategories = document.querySelectorAll(".btn-categories");

btnCategories.forEach((btnCategory) => {
    btnCategory.addEventListener('click',()=>{
        console.log("object");
    })
});
