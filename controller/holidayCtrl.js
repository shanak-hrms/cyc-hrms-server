const Holiday = require('../model/holidaylist');

exports.createHoliday = async (req, res) => {
  try {
      const { holidayArray } = req.body;
      const { role } = req.user
      if (role !== "HR" && role !=="ADMIN") {
          throw new Error("Only HR or ADMIN is allowed to add holiday list.");
      }
      
      await Promise.all(holidayArray.map(async (holiday) => {
          const { name, date, year, month, description } = holiday;
          const existingHoliday = await Holiday.findOne({ name: name.toLowerCase() });
          if (existingHoliday) {
              throw new Error('Holiday already exists');
          }
          const newHoliday = new Holiday({
              name: name.toLowerCase(),
              date,
              year,
              month,
              description
          });
          await newHoliday.save();
      }));

      res.status(201).json({ message: 'Holidays created successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Server error' });
  }
};

exports.getAllHolidaysOfYear = async (req, res) => {
  try {
      const { year} = req.query;

      const holidays = await Holiday.find({ year});
      res.json(holidays);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllHolidaysOfMonth = async (req, res) => {
    try {
        const { year, month } = req.query;

        const holidays = await Holiday.find({ year, month });
        res.json(holidays);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
