import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generate-JWT.js";
import User from "../modules/user/user.model.js";

//FIX THIS METHOD
export const editUser = async (req, res) => {
  const { name, email, img, password } = req.body;
  const { id } = req.params;
  const userOld = await User.findById(id);
  if (!name) {
    name = userOld.name;
  }
  if (!email) {
    email = userOld.email;
  }
  if (!password) {
    password = userOld.password;
  }
  if (!img) {
    img = userOld.img;
  }
  await User.findByIdAndUpdate(id, {
    name: name,
    email: email,
    img: img,
    password: password,
  });
  const newUser = await User.findById(id);
  res.status(200).json({
    msg: "User updated",
    newUser,
  });
};

/*
export const editName = async (req, res) => {
    const name = req.body;
    const usuarioAutenticado = req.user;
    await User.findByIdAndUpdate(usuarioAutenticado.id, name);
    const userNew = await User.findById(usuarioAutenticado.id);
  
    res.status(200).json({
      msg: "User updated successfully",
      userNew
    });
  };

  export const editPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const usuarioAutenticado = req.user;
    const p = await User.findById(usuarioAutenticado.id);
    const acces = bcryptjs.compareSync(oldPassword, p.password);
  
    if (!acces) {
      return res.status(400).json({
        msg: "Incorrect password"
      })
    }
    const salt = bcryptjs.genSaltSync();
    const finalPassword = bcryptjs.hashSync(newPassword, salt);
    await User.findByIdAndUpdate(usuarioAutenticado.id, { password: finalPassword });
  
    res.status(200).json({
      msg: "Password updated successfully",
  
    });
  };
*/
export const deleteUser = async (req, res) => {
  const { Password } = req.body;
  const usuarioAutenticado = req.user;
  const p = await User.findById(usuarioAutenticado.id);
  const acces = bcryptjs.compareSync(Password, p.password);

  if (!acces) {
    return res.status(400).send("Incorrect password");
  }

  await User.findByIdAndUpdate(usuarioAutenticado.id, { status: false });

  res.status(200).json({
    msg: "User Deleted",
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  var role;
  var usuario;
  try {
    if (email.includes("admin.org.gt")) {
      role = "ADMIN_ROLE";
    } else {
      role = "USER_ROLE"; // Set default role to USER_ROLE
    }

    usuario = new User({ name, email, password, role });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(200).json({
      usuario,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .send("The email is not registered in the database.");
    }

    if (!user.status) {
      return res.status(400).send("The user does not exist in database.");
    }

    const validPassword = await bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).send("Incorrect password.");
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
