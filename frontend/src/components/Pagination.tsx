import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

type Props = {
    page: number,
    pages: number,
    onChange: (page: number) => void;
}

const Pagination = ({page, pages, onChange}: Props) =>{
    return(
        <div>
            {pages > 1 &&
                <div className="flex flex-row gap-1 align-bottom">
                    {page > 1 && <button onClick={()=>onChange(page-1)} className="w-8 h-8 flex items-center justify-center cursor-pointer bg-blue-600 text-white"><FaArrowLeft/></button>}
                    {Array.from({length: pages}).map((i, index)=>(
                        <div
                            className={`
                                w-8 h-8 flex items-center justify-center cursor-pointer font-bold
                                ${index + 1 === page ? "bg-gray-400 text-white" : "bg-blue-600 text-white"}
                            `}
                            onClick={()=>onChange(index+1)}>
                            {index+1}
                        </div>
                    ))}
                    {page < pages && <button onClick={()=>onChange(page+1)} className="w-8 h-8 flex items-center justify-center cursor-pointer bg-blue-600 text-white"><FaArrowRight/></button>}
                </div>
                }
        </div>
    )
}
export default Pagination