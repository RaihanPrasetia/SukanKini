const { Bank } = require('../../associations');

const createBank = async (req, res) => {
    try {
        const userId = req.userId;
        const { an, no_rek, brand } = req.body;


        if (!an || !no_rek) {
            return res.status(400).json({ message: 'Missing required fields: an, no_rek' });
        }
        const UpperCaseBrand = brand.toUpperCase();
        const newBank = await Bank.create({
            an,
            no_rek,
            brand: UpperCaseBrand,
            createdBy: userId,
        });

        res.status(201).json({ message: 'Bank created successfully', bank: newBank });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create bank', error: error.message });
    }
};

const getBankById = async (req, res) => {
    try {
        const bankId = req.params.id; // ID Bank dari URL params

        const bank = await Bank.findOne({
            where: { id: bankId },
        });

        if (!bank) {
            return res.status(404).json({ message: 'Bank not found or you are not authorized to view this bank' });
        }

        res.status(200).json({ bank });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve bank', error: error.message });
    }
};


const getUserBanks = async (req, res) => {
    try {
        const userId = req.userId;

        const banks = await Bank.findAll({
            where: { createdBy: userId },
        });

        if (!banks || banks.length === 0) {
            return res.status(404).json({ message: 'No banks found for this user.' });
        }

        res.status(200).json({ banks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve banks', error: error.message });
    }
};




const updateBank = async (req, res) => {
    try {
        const userId = req.userId;
        const bankId = req.params.id;
        const { an, no_rek, brand } = req.body;

        if (!an && !no_rek && !brand) {
            return res.status(400).json({ message: 'At least one field (an, no_rek, brand) must be provided to update' });
        }

        const bank = await Bank.findOne({ where: { id: bankId, createdBy: userId } });

        if (!bank) {
            return res.status(404).json({ message: 'Bank not found or you are not authorized to update this bank' });
        }

        if (an) {
            bank.an = an;
        }
        if (no_rek) {
            bank.no_rek = no_rek;
        }
        if (brand) {
            bank.brand = brand.toUpperCase();
        }

        await bank.save();

        res.status(200).json({ message: 'Bank updated successfully', bank });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update bank', error: error.message });
    }
};


const deleteBank = async (req, res) => {
    try {
        const userId = req.userId;
        const bankId = req.params.id;

        if (!bankId) {
            return res.status(400).json({ message: 'Missing required field: bankId' });
        }

        const bank = await Bank.findOne({ where: { id: bankId, createdBy: userId } });

        if (!bank) {
            return res.status(404).json({ message: 'Bank not found or you are not authorized to delete this bank' });
        }

        await bank.destroy();

        res.status(200).json({ message: 'Bank deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete bank', error: error.message });
    }
};


module.exports = { createBank, getUserBanks, updateBank, deleteBank, getBankById };

