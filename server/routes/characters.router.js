// bring in express
const express = require('express');

// bring in router functionality
const router = express.Router();

// bring in pool module
const pool = require('../modules/pool');

/* ----GET---- */
router.get('/', async (req, res) => {

    // create a client make the pool connection
    const client = await pool.connect();

    // try executes if theres no errors
    try{

        // start the transaction block
        await client.query('BEGIN')

        // get the count of all the characters
        const characterCount = await client.query(`
            SELECT 
            COUNT("characters".character)
            FROM "characters";
        `);

        // get the count of characters from each anime
        const charactersPerAnime = await client.query(`
            SELECT "characters".anime_title, 
	            COUNT("characters".character) as "characters_per_anime"
            FROM "characters"
            GROUP BY "characters".anime_title;
        `);

        console.log(charactersPerAnime.rows);

        // array to hold the ratios
        let characterToAnimeRatios = [];

        // loop through the charactersPerAnime array and divide
        // each number of characters_per_anime by the character count
        for (let show of charactersPerAnime.rows){

            // get the total characters per show for the current
            // object in the array
            const totalPerAnime = show.characters_per_anime;

            // create variable for the total characters
            const totalCharacters = characterCount.rows[0].count;

            // push the data object to the ratios array
            characterToAnimeRatios.push({
                angle: totalPerAnime/totalCharacters*100,
                label: show.anime_title,
                subLabel: `${totalPerAnime/totalCharacters*100}%`
            });
        };

        console.log(characterToAnimeRatios);

        // send the results to client
        res.send(characterToAnimeRatios);
        
    }

    // catch executes if theres an error (e) in try
    catch (e) {

        // abort sequel query
        await client.query('ROLLBACK');
        console.log('Error in characters router GET aborted:', e);

        // send rejected status code
        res.sendStatus(500);
    }

    // finally executes when try or catch is finished
    finally {

        // call the release callback
        client.release();
    }
})

/* ----POST---- */

// export the router 
module.exports = router;