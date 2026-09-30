import 'dotenv/config';
import { Snowflake } from '@pokedotdev/snowflake';

const snowflake = new Snowflake({
    epoch: Number(process.env.SNOWFLAKE_EPOCH)
})

function generateId(mid) { 
    return snowflake.generator({ node:mid }).generate();
}

export default generateId;