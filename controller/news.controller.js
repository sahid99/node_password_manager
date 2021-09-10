const axios = require('axios');

const getNoticias = async (req, res) => {
	
	try {
        const URL = `https://newsapi.org/v2/top-headlines?country=mx&apiKey=58bb9178ef434836ab475a40e90b693a`;
        const result = await axios.get(URL);
        const { data } = result;
        res.json({ data });
    } catch (error) {
        //console.log(error);
        res.status(500).json({ success: false, message: "Server error"});
    }

}


module.exports = {getNoticias};