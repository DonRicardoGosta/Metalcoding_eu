/*

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:255
    },
    category: {
        type: String,
        required: true,
        enum: ['web','mobile', 'network'],
        lowercase: true
        //trim: true //remove spaces
    },
    author: String,
    tags: {
        type: Array,
        validate:{
            validator: function (v){
                return v && v.length > 0;
            },
            message: 'A project should have at least 1 tag.'
        }
    },
    date: {type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function (){return this.isPublished;},
        min:10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Project = mongoose.model('Project', projectSchema);

async function createProject(){
    const project = new Project({
        name: 'Angular Course',
        category: 'Web',
        author: 'Dani',
        tags:['frontend'],
        isPublished: true,
        price: 15.8
    });
    try{
        const result = await project.save();
        console.log(result);
    }catch (ex){
        for (field in ex.errors){
            console.log(ex.errors[field].message);
        }
    }

}

async function getProjects(){

        eq (equal)
        ne (not equal)
        gt (greater than)
        gte (greater than or equal to)
        lt (less than)
        lte (less than or equal to)
        in
        non (not in)

        .find({ price: { $gt: 10, $lte: 20 }})
        .find({price: { $in: [10,15,20] } })


     or, and
     ex: .or([{author: 'Dani'},{isPublished: true}])



    starts with Dani
        .find({author: /^Dani/})

    ends with Dani
        .find({author: /Dani$/})

    contains Dani
        .find({author: /.*Dani.* /})

    const pageNumber = 2;
    const pageSize = 10;

    const projects = await Project
        .find({author:'Dani', isPublished: true})
        .skip((pageNumber-1)* pageSize)
        .limit(pageSize) //first x piece of objects
        .sort({ name: 1})
        .select({name:1, tags: 1});
        //.count() //gives back the num of projects found
    console.log(projects)
}
async function updateCourse(id){ //if we get the update request from the customer
    //select -> update
    const project = await Project.findById(id);
    if(!project) return;
    project.isPublished = true;
    project.author = 'Another Author';

    const result = await project.save();
    console.log(result);
}
async function updateCourse(id){
    const result = await Project.updateOne({ _id: id },{
        $set:{
            author: 'Dani',
            isPublished: true
        }
    });

    console.log(result);
}
async function removeCourse(id){
    const result = await Project.deleteOne({ _id: id});
    console.log(result);
}
//removeCourse('61acad15761dbba171715e43');
//updateCourse('61acad15761dbba171715e43');
//getProjects();
createProject();
*/