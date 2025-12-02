const boom = require('@hapi/boom');
const db = require('./../../libs/postgres.pool');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { transporter } = require('../../config/mailer');
const { config } = require('../../config/config');

class UserService {
  constructor() {}
  async findOne(id) {
    const query = 'SELECT * FROM user WHERE user_id=$1';
    const values = [id];
    const res = await db.query(query, values);
    if (res.rows.length === 0) {
      throw boom.notFound('User not found');
    }
    return res.rows[0];
  }

  async hasPassword(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async existsEmail(email) {
    const query = 'SELECT * FROM "user" WHERE email=$1';
    const values = [email];
    const res = await db.query(query, values);
    return res.rows.length > 0;
  }

  async verifyEmailExistence(email) {
    const exist = await this.existsEmail(email);
    if (exist) {
      throw boom.notFound('Email is already created');
    }
    return exist;
  }

  async existsUsername(username) {
    const query = 'SELECT * FROM user WHERE username=$1';
    const values = [username];
    const res = await db.query(query, values);
    return res.rows.length > 0;
  }

  async findPlan(type) {
    const query =
      'SELECT plan_id,type_plan::text FROM plans WHERE type_plan::text=$1';
    const values = [type];
    const res = await db.query(query, values);
    return res.rows;
  }

  async createInAPP(user) {
    const { username, password, birthdate, email } = user;
    const emailExists = await this.existsEmail(email);
    if (emailExists) {
      throw boom.conflict('Email already exists');
    }

    const rowsPlans = await this.findPlan('basic');
    if (rowsPlans.length === 0) {
      throw boom.notFound('Error assigning plan free to user');
    }
    const { plan_id, type_plan } = rowsPlans[0];
    const hashedPassword = await this.hasPassword(password);
    const values = [username, hashedPassword, birthdate, email, plan_id];
    const rows_user_id = await this.createUser(values, "'application'");
    if (rows_user_id.length === 0) {
      throw boom.conflict('Error creating user');
    }
    const user_id = rows_user_id[0].user_id;
    return {
      user_id,
      type_plan,
      account: 'application',
      username,
      email,
      birthdate,
    };
  }

  async createUser(values, type_account) {
    const query = `INSERT INTO "user" (username,password,birth_date,email,plan_id,has_reserved,type_account)
                  VALUES ($1,$2,$3,$4,$5 ,false,${type_account}) RETURNING user_id`;
    const res = await db.query(query, values);
    return res.rows;
  }

  async findOrCreate(profile, cb) {
    const { emails, displayName, provider, photos } = profile;
    const email = emails[0].value;
    const photo = photos[0].value;
    const emailExists = await this.existsEmail(email);
    const message = emailExists ? 'user logged in' : 'user created';
    if (!emailExists) {
      const plan_id = await this.findPlan('basic');
      if (!plan_id) {
        return cb(new Error('Plan not found'));
      }
      const values = [displayName, null, null, email, plan_id, photo];
      const id = await this.createUser(values, `'${provider}'`);
      if (!id) {
        return cb(new Error('Error creating user'));
      }
    }
    return cb(null, {
      id,
      account: provider,
      email,
      username: displayName,
      birth_date: null,
      photo,
      message,
    });
  }

  async sendLinkToEmail(email) {
    const token = jwt.sign({ email }, config.SECRET_JWT_KEY, {
      expiresIn: '10m',
    });
    const verificationLink = `http://localhost:3000/auth/register?token=${token}`;
    await transporter.sendMail({
      from: '"Auto Taxi" <marc.osorio.biz@gmail.com>',
      to: email,
      subject: 'Email Verification',
      html: `<b>Please click below link to verify your email</b>
               <a href="${verificationLink}">Verify Email</a>`,
    });
    return { message: 'Verification email sent', ok: true };
  }
}

module.exports = UserService;
