import { Department } from './department.model'
import { createOne, getOne, updateOne, removeOne } from '../../utils/crud'
import { Types } from 'mongoose'

export const addDept = createOne(Department)

export const getDept =  async (req, res) => {
    
    let matchObject = {}

    if(req.query.roleId !== '1') {
        matchObject = { _id:Types.ObjectId(req.params.id) }
    }

    try {
        const departments = await Department.aggregate([
            { $match:matchObject },
            {
                $lookup: {
                    from: "courses",
                    localField:"_id",
                    foreignField:"department",
                    as:"courses"
                }
            },
            {
                $unwind: {
                    path: "$courses",
                    preserveNullAndEmptyArrays: true // optional
                }
            },
            {
                $lookup: {
                    from:"batches",
                    localField:"courses._id",
                    foreignField:"course",
                    as:"courses.batches"
                }
            },
        ])

        return res.status(200).json(departments)

    } catch (e) {
        console.log(e)
        return res.status(500).end()
    }
}

export const getMany = async (req, res) => {
    try {
        const departments = await Department.aggregate([
            {
                $lookup: {
                    from: "courses",
                    localField:"_id",
                    foreignField:"department",
                    as:"courses"
                }
            }
        ])

        return res.status(200).json(departments)

    } catch (e) {
        console.log(e)
        return res.status(500).end()
    }
}

export const updateDept = updateOne(Department)

export const deleteDept = removeOne(Department)