const db = require('../db');

exports.listServices = async (req, res) => {
  const services = await db('services').select('*');
  res.render('services', { services, user: req.session.user });
};

exports.submitRequest = async (req, res) => {
  const { service_id, description } = req.body;
  const [request] = await db('requests')
    .insert({
      citizen_id: req.session.user.id,
      service_id,
      description,
      status: 'submitted'
    })
    .returning('*');

  // اگر فایل‌ها آپلود شده بودن
  if (req.files) {
    for (let f of req.files) {
      await db('documents').insert({
        request_id: request.id,
        file_path: '/uploads/' + f.filename
      });
    }
  }

  res.redirect('/citizen/requests');
};

exports.citizenRequests = async (req, res) => {
  const requests = await db('requests')
    .join('services', 'requests.service_id', 'services.id')
    .select('requests.*', 'services.name as service_name')
    .where('citizen_id', req.session.user.id);
  res.render('citizen-requests', { requests, user: req.session.user });
};

exports.officerRequests = async (req, res) => {
  const requests = await db('requests as r')
    .join('services as s', 'r.service_id', 's.id')
    .join('departments as d', 's.department_id', 'd.id')
    .join('users as u', 'r.citizen_id', 'u.id')
    .select('r.*', 's.name as service_name', 'u.name as citizen_name')
    .where('s.department_id', req.session.user.department_id);
  res.render('officer-requests', { requests, user: req.session.user });
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // approved/rejected
  await db('requests').where({ id }).update({
    status,
    updated_at: new Date()
  });
  res.redirect('/officer/requests');
};
