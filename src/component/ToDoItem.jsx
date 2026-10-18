import dayjs from 'dayjs';
import React from 'react';

const ToDoItem = (props) => {

    const { data, cd, setter } = props;

    return (
        <div className='gap-1 flex items-center'>
            <p>{dayjs(data.update).format('MM/DD HH:mm') + (cd? ' 생성' : ' 완료')}</p>
            <button
                className={`rounded-sm p-2 cursor-pointer ${cd? 'bg-yellow-500' : 'bg-red-500'}`}
                onClick={() => 
                        setter(dc => cd?
                        [
                            ...dc.map(dcp =>

                                (dcp.id === data.id)?
                                    {...dcp, completed: true, update: Date.now()}
                                :
                                    dcp
                            )
                        ]
                    :
                        [
                            ...dc.filter(dcp => data.id !== dcp.id)
                        ])
                }
            >{cd? '완료' : '삭제'}</button>
        </div>
    );
};

export default ToDoItem;