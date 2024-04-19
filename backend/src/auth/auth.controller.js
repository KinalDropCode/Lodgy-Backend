import User from "../modules/user/user.model.js";
import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generate-JWT.js";

export const register = async (req, res) =>{
    console.log('');
    console.log('--- [NOTES] register.auth')
    try {
        const { name, email, password} = req.body;
        const role = "USER_ROLE";

        const user = new User({name, email, password, role});

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        console.log(user);
        await user.save();
        return res.status(200).json({
            msg: "user has been added to database",
            userDetails: {
              user: user.name,
              email: user.email,
            },
          });
    } catch (e) {
        if (e.code === 11000) {
            res.status(500).json({ msg: 'The email already was register.' });
        }else{
            res.status(500).json({ msg: 'There was an error adding user.', e});
        }
        // throw new Error(e);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
        return res.status(400).json({
            msg: "The email is not registered in the database.",
        });
        }

        if (!user.status) {
        return res.status(400).json({
            msg: "The user does not exist in database.",
        });
        }

        const validPassword = await bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Incorrect password.",
            });
        } else {
            const token = await generateJWT(user.id, user.email);

            res.status(200).json({
                msg: "Login ok",
                userDetails: {
                email: user.email,
                token: token,
                },
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
        msg: "Please contact the administrator/support.",
        });
    }
};
