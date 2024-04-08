const Data = require('../models/product.model');

// async function getMedicineData(req, res, category) {
//   try {
//     const data = await Data.find({ Category: category });
//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error});
//   }
// }

const Category= require('../models/product2.model');

// async function getCategoryData(req, res,category) {
//   try {
//       const categories = await Category.find({ Category: category });
//       res.status(200).json(categories);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error });
//   }
// }

// module.exports = {
//   getCapsule: async (req, res) => getMedicineData(req, res, 'Capsule'),
//   getInjection: async (req, res) => getMedicineData(req, res, 'Injection'),
//   getTablet: async (req, res) => getMedicineData(req, res, 'Tablet'),
//   getCream: async (req, res) => getMedicineData(req, res, 'Cream'),
//   getDrops: async (req, res) => getMedicineData(req, res, 'Drops'),
//   getLotion: async (req, res) => getMedicineData(req, res, 'Lotion'),
//   getShampoo: async (req, res) => getMedicineData(req, res, 'Shampoo'),
//   getSoap: async (req, res) => getMedicineData(req, res, 'Soap'),
//   getSyrup: async (req, res) => getMedicineData(req, res, 'Syrup'),
//   BabyCare: async (req, res) =>  getCategoryData(req, res, 'BabyCare'),
//   WomenCare: async (req, res) =>  getCategoryData(req, res, 'WomenCare'),
//   Protein: async (req, res) =>  getCategoryData(req, res, 'Protein'),
//   Supplements: async (req, res) =>  getCategoryData(req, res, 'Supplements'),
//   SkinCare: async (req, res) =>  getCategoryData(req, res, 'SkinCare'),
//   HealthDevices: async (req, res) =>  getCategoryData(req, res, 'HealthDevices'),
//   PersonalCare: async (req, res) =>  getCategoryData(req, res, 'PersonalCare'),
// };

//
const getProducts = async (req, res) => {
  const { category } = req.query || {};

  try {
    if (!category) {
      return res.status(400).json({ message: 'Please provide a valid search criteria (category)' });
    }

    let categoryData = await Category.find({ Category: category });
    let medicineData = await Data.find({ Category: category });

    let combinedData = [...categoryData, ...medicineData];

    if (combinedData.length === 0) {
      return res.status(404).json({ message: 'No data found for the given category' });
    }

    res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { getProducts };

