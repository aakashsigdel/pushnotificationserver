var express = require('express');
var router = express.Router();
var FCM = require('fcm-node');
var Device = require('../models/device')


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', function(req, res, next) {
	res.send({message: 'I am aakash\'s response'})
})

router.post('/api/register', function(req, res, next) {
	var device = new Device()
	Device.findOne({deviceToken: req.body.deviceToken}, function (err, device) {
		console.log(device)
		if(device === null) {
			console.log('new device')
			device.name = req.body.name || 'Test Device'
			device.deviceToken = req.body.deviceToken

			device.save(function(err) {
				if(err) {
					res.send({err})
				}

			})
		}
	})
	res.send({message: 'devices registered!', name: req.body.name || 'Test Device'})
})

router.get('/api/devices', function (req, res, next) {
	Device.find(function(err, devices) {
		if(err) {
			res.send(err)
		}

		res.json(devices)
	})
})

// route that sends push notification
router.post('/api/send_push', function(req, res, next) {
	if(!req.body.deviceToken || !req.body.title || !req.body.body) {
		res.send({err: 'invalid request'})
	}

	var serverKey = 'AIzaSyDgQtFrcjvgJ-jl_GKzUlaEZQ3AcVN3I4w'
	var fcm = new FCM(serverKey)

	var message = {
		to: req.body.deviceToken,
		notification: {
			title: req.body.title,
			body: req.body.body
		},
		data: {
			'key1': 'aakash',
			'key2': 'sigdel'
		}
	}

	fcm.send(message, function(err, response) {
		if(err) {
			res.send(err)
		} else {
			res.send({message: 'pushed to ' + req.body.deviceToken})
		}
	})
})

// deleting a device
router.delete('/api/devices/:_id', function(req, res, next) {
	Device.findOne({ _id: req.params._id }, function(err, device) {
		device.remove(function(err) {
			if(err) {
				res.send(err)
			}

			res.send({message: 'Successfully Deleted', status: 'OK'})
		})
	})
})

module.exports = router;
