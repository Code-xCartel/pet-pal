import { getOne, createOne, deleteOne } from "../../database/crud.js";
import { Pets } from "../../database/models/pets/my-pets.js";
import { Adoption } from "../../database/models/pets/adoption.js";

const putPetForAdoption = async (req, res) => {
  const pet = await getOne(Pets, req.params.id);
  if (!pet) {
    return res.status(404).json({ error: "Pet not found" });
  }
  if (req.userToken.id !== pet.owner_id)
    return res.status(403).json({ error: "You don't have permission to perform this action, invalid pet-owner combination" });
  const { _id, created_at, updated_at, ...rest } = pet._doc;
  const newQuery = {
    ...rest,
    adoption_status: 'available',
  }
  const response = await createOne(Adoption, newQuery);
  await deleteOne(Pets, req.params.id);
  return res.status(200).json({ adoption_created: response._id });
};

const cancelAdoption = async (req, res) => {
  const pet = await getOne(Adoption, req.params.id);
  if(!pet) return res.status(404).json({ error: "Pet not found" });
  console.log(req.userToken.id, pet.owner_id)
  if (req.userToken.id !== pet.owner_id)
    return res.status(403).json({ error: "You don't have permission to perform this action, invalid pet-owner combination" });
  const { _id, created_at, updated_at, adoption_status, ...rest } = pet._doc;
  const response = await createOne(Pets, rest);
  await deleteOne(Adoption, req.params.id);
  return res.status(200).json({ adoption_cancelled: response._id });
};

export { putPetForAdoption, cancelAdoption };