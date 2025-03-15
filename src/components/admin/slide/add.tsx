import React from 'react'
import { useForm } from 'react-hook-form'
import { ISlide } from '../../../interface/slide'
import { useMutation } from '@tanstack/react-query'
import { createData } from '../../../services/data'

const AddSlide = () => {
    const {register,handleSubmit} = useForm<ISlide>()
    const mutation = useMutation({
        mutationFn: async(slide:ISlide)=>{
            const {data} = await createData<ISlide>("sliders",slide)
            return data
        },
        onSuccess: (data)=>{
            alert("Thêm slide thành công")
            console.log(data);            
        }
    })
    const onsubmit = (slide:ISlide)=>{
        mutation.mutate(slide)
    }
  return (
    <div>
        <h1 className='text-[1.5rem] text-center mb-5'>Thêm mới Slide</h1>
        <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-2 max-w-xl mx-auto border p-5 rounded [&_input]:border [&_input]:px-2 [&_input]:py-1'>
            <input type='text' {...register("label")} placeholder='Tiêu đề'/>
            <input type='text' {...register("image")} placeholder='Link ảnh'/>
            <input type='text' {...register("caption")} placeholder='Mô tả'/>
            <input type='text' {...register("url")} placeholder='Link liên kết'/>
            <button type='submit'>Thêm mới</button>
        </form>
    </div>
  )
}

export default AddSlide