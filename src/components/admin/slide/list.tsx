import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { ISlide } from '../../../interface/slide';
import { ListData } from '../../../services/data';
import { Table } from 'antd';
import { render } from 'react-dom';

const ListSlideAdmin = () => {
    const {data,isLoading} = useQuery<ISlide[]>({
        queryKey:["sliders"],
        queryFn:async ()=>{
            const {data} = await ListData("sliders")
            return data
        }
    })
    const columns = [
        {
          title: 'STT',
          dataIndex: 'stt',
          key: 'stt',
          render: (_:any,data:ISlide,index:any)=>index+1
        },
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
        },
        {
          title: 'Label',
          dataIndex: 'label',
          key: 'label',
        },
        {
            title: 'Caption',
            dataIndex: 'caption',
            key: 'caption',
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_:any,data:ISlide,index:any)=><>
                <button>Sửa</button>
                <button>Xóa</button>
            </>
        }
      ];
  return (
    <div>
        <h1 className='text-[1.5rem] text-center mb-5'>Quản lý SLiders</h1>
        {(data)&&
            <Table dataSource={data} columns={columns} />
        }
    </div>
  )
}

export default ListSlideAdmin