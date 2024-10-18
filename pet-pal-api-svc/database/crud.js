export const createOne = async (model, data) => {
  try {
    return await model.create(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createMany = async (model, data) => {
  try {
    return await model.insertMany(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMany = async (model, query = {}) => {
  // Add pagination/search logic
  try {
    return await model.find(query);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOne = async (model, id) => {
  try {
    return await model.findById(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOneByField = async (model, field, query) => {
  try {
    return await model.findOne({ [field]: query });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateOne = async (model, id, data) => {
  try {
    return await model.findByIdAndUpdate(id, data, {new: true, runValidators: true});
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteOne = async (model, id) => {
  try {
    return await model.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};
