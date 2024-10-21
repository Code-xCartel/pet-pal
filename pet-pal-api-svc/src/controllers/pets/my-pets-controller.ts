import { type Request, type Response } from "express";
import { createMany, getMany, getOne, updateOne } from "../../database/crud.js";
import { IPet, PetsModel } from "../../database/models/pets/my-pets-model.js";

const demoPets = [
  {
    name: "Buddy",
    species: "Dog",
    breed: "Golden Retriever",
    age: 4,
    gender: "Male",
    size: "large",
    color: "Golden",
    weight: 30,
    spayed_neutered: true,
    vaccinated: true,
    description: "A friendly and energetic dog who loves to play fetch.",
    medical_conditions: "None",
    last_checkup_date: new Date("2023-09-15"),
    location: "New York, NY",
    owner_id: "12345",
    good_with_children: true,
    good_with_pets: true,
    activity_level: "high",
    special_needs: "None",
    photo_url: "https://example.com/photos/buddy.jpg"
  },
  {
    name: "Whiskers",
    species: "Cat",
    breed: "Siamese",
    age: 2,
    gender: "Female",
    size: "small",
    color: "Cream and brown",
    weight: 4,
    spayed_neutered: true,
    vaccinated: true,
    description: "A calm cat who enjoys sunbathing and cuddling.",
    medical_conditions: "None",
    last_checkup_date: new Date("2023-06-20"),
    location: "San Francisco, CA",
    owner_id: "54321",
    good_with_children: false,
    good_with_pets: true,
    activity_level: "low",
    special_needs: "None",
    photo_url: "https://example.com/photos/whiskers.jpg"
  },
  {
    name: "Rex",
    species: "Dog",
    breed: "German Shepherd",
    age: 6,
    gender: "Male",
    size: "large",
    color: "Black and tan",
    weight: 35,
    spayed_neutered: false,
    vaccinated: true,
    description: "A protective dog with excellent obedience skills.",
    medical_conditions: "Hip dysplasia",
    last_checkup_date: new Date("2024-01-10"),
    location: "Chicago, IL",
    owner_id: "67890",
    good_with_children: true,
    good_with_pets: false,
    activity_level: "mid",
    special_needs: "Regular joint supplements",
    photo_url: "https://example.com/photos/rex.jpg"
  },
  {
    name: "Snowball",
    species: "Rabbit",
    breed: "Holland Lop",
    age: 1,
    gender: "Female",
    size: "small",
    color: "White",
    weight: 1.5,
    spayed_neutered: false,
    vaccinated: false,
    description: "A curious and playful rabbit who loves to hop around.",
    medical_conditions: "None",
    last_checkup_date: new Date("2023-12-01"),
    location: "Los Angeles, CA",
    owner_id: "24680",
    good_with_children: true,
    good_with_pets: true,
    activity_level: "low",
    special_needs: "None",
    photo_url: "https://example.com/photos/snowball.jpg"
  },
  {
    name: "Bella",
    species: "Dog",
    breed: "Bulldog",
    age: 3,
    gender: "Female",
    size: "medium",
    color: "White and brown",
    weight: 20,
    spayed_neutered: true,
    vaccinated: true,
    description: "A gentle and affectionate dog who enjoys short walks.",
    medical_conditions: "Skin allergies",
    last_checkup_date: new Date("2023-11-25"),
    location: "Houston, TX",
    owner_id: "13579",
    good_with_children: true,
    good_with_pets: false,
    activity_level: "low",
    special_needs: "Allergy medications",
    photo_url: "https://example.com/photos/bella.jpg"
  },
] as IPet[];

const createMyPets = async (req: Request, res: Response): Promise<void> => {
  const response = await createMany(PetsModel, demoPets);
  res.status(201).json({ petCreated: response.map(it => it._id) });
  return;
};

const getMyPets = async (req: Request, res: Response): Promise<void> => {
  const query = {
    'owner_id': {
      $in: req.params.owner_id,
    }
  };
  const response = await getMany(PetsModel, query);
  res.status(201).json(response);
  return;
};

const getMySinglePet = async (req: Request, res: Response): Promise<void> => {
  const response = await getOne(PetsModel, req.params.id);
  res.status(200).json(response);
  return;
}

const updateMyPet = async (req: Request, res: Response): Promise<void> => {
  const existingPet = await getOne(PetsModel, req.params.id);
  if(!existingPet) {
    res.status(404).json({ error: 'Pet not found' });
    return;
  }
  const response = await updateOne(PetsModel, req.params.id, req.body);
  res.status(200).json({ petUpdated: response?._id });
  return;
}

export { createMyPets, getMyPets, getMySinglePet, updateMyPet };