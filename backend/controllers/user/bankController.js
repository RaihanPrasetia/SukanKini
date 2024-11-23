const { Bank } = require('../../associations');


const getBankMitra = async (req, res) => {
    try {
        const createdBy = req.params.userId; // ID Bank dari URL params

        const bank = await Bank.findAll({
            where: { createdBy: createdBy },
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

module.exports = { getBankMitra };