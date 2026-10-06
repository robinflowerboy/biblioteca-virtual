import 'dotenv/config';
//import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import generateId  from '#utils/snowflake.js';
import { createClient } from '@supabase/supabase-js';
import { generateToken } from '#utils/token.js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

async function userExists(user) {
    const { data, error } = await supabase .from('users').select('id').eq('username', user); 
    return data.length > 0
}

export async function register(res, email, user, passwd) {
    if (await userExists(user)) {
        return res.status(400).json({error: 'Este usário já está sendo usado.'});
    }
    
    const { data, error } = await supabase.from('users').insert([{      
        id: generateId(0),
        email: email,
        username: user,
        password: await bcrypt.hash(passwd, 10) 
    }]);

    if(error) {
        console.log(error);
        res.status(500).json({erro: 'Erro no servidor.'});
    } else {
       res.sendStatus(200);
    }
}

export async function login(res, user, passwd) {
    if (!await userExists(user)) {
        return res.status(401).json({error: 'Username ou password incorreto.'});
    }
    const {data, error} = await supabase.from('users').select('password, id').eq('username', user);
    if(!await bcrypt.compare(passwd, data[0].password)) {
        return res.status(401).json({error: 'Username ou password incorreto.'});
    }
    else {
        res.cookie('accessToken', generateToken(data[0].id, process.env.JWT_ACCESS_SECRET, "7d" ),{ 
            httpOnly: true,
            secure:false,
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        res.sendStatus(200);;
    }
}