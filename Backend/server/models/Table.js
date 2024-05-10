const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // Reference to the Student model
        required: true
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true
    },
    grade: {
        type: String,
        required: [true, 'Grade is required'],
        trim: true,
        uppercase: true,
        validate: {
            validator: function(v) {
                return /^[A-F][+-]?$/.test(v); // Validates grades like A, B+, C-, etc.
            },
            message: props => `${props.value} is not a valid grade!`
        }
    },
    attendance: {
        type: Number,
        required: [true, 'Attendance is required'],
        min: [0, 'Attendance cannot be less than 0'],
        max: [100, 'Attendance cannot be more than 100']
    },
    comments: {
        type: String,
        maxlength: [500, 'Comments cannot exceed 500 characters']
    }
});

// Middleware to run before saving a new table entry
tableSchema.pre('save', function(next) {
    // Example: Convert all comments to lowercase before saving
    if (this.comments) {
        this.comments = this.comments.toLowerCase();
    }
    next();
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;