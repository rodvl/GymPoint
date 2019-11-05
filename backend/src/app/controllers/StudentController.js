import * as yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      idade: yup
        .number()
        .required()
        .positive()
        .integer(),
      peso_kg: yup
        .number()
        .required()
        .positive()
        .integer(),
      altura_cm: yup
        .number()
        .required()
        .positive()
        .integer(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const StudentExist = await Student.findOne({
      where: { email: req.body.email },
    });
    if (StudentExist) {
      return res.status(400).json({ error: 'Student already in exists' });
    }
    const { id, email, name } = await Student.create(req.body);
    return res.json({ id, email, name });
  }

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      newEmail: yup.string().email(),
      email: yup
        .string()
        .email()
        .required(),
      idade: yup
        .number()
        .positive()
        .integer(),
      peso_kg: yup
        .number()
        .positive()
        .integer(),
      altura_cm: yup
        .number()
        .positive()
        .integer(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, newEmail } = req.body;
    const student = await Student.findOne({
      where: { email },
    });
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }
    if (newEmail) {
      const emailInUse = await Student.findOne({
        where: { email: newEmail },
      });
      if (emailInUse) {
        return res.status(400).json({ error: 'Student already exists' });
      }

      req.body.email = newEmail;
    }
    const { id, name, emailUp } = await student.update(req.body);
    return res.json({ id, name, emailUp });
  }

  async show(req, res) {
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
    });
    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email } = req.query;
    const student = await Student.findOne({
      where: { email },
    });
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }
    const { id, name, idade, peso_kg, altura_cm } = student;
    return res.json({ id, name, email, idade, peso_kg, altura_cm });
  }
}

export default new StudentController();
