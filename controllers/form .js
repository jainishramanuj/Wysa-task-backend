const getForm = async (req, res) => {
    res.status(200).json({
        msg : "Request successfully on getForm"
    });
}

module.exports = getForm;