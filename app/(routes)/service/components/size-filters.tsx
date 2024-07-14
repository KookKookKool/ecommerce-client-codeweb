"use client"

import Box from "@/components/box";
import { cn } from "@/lib/utils";
import { Size } from "@/types-db";
import { url } from "inspector";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface SizesFilterProps {
    sizes: Size[];
}

const SizesFilter = ({ sizes } : SizesFilterProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleClick = (size:string) => {
        const currentParams = Object.fromEntries(searchParams.entries())

        if(currentParams.size === size){
            delete currentParams.size      
        }else {
            currentParams.size = size
        }

        const href = qs.stringifyUrl ({
            url : "/service",
            query : currentParams
        })

        router.push(href);
    }

    const sortedSizes = sizes.sort((a, b) => {
        // กำหนดลำดับของแต่ละแพ็คเกจตามที่ต้องการ
        const order = ['UX/UI Design', 'Single Page Website', 'Multi-Page Website', 'Blog Website with CMS', 'E-Commerce Website with CMS', 'E-Commerce and Blog Website with Custom CMS'];
        
        // ใช้ indexOf เพื่อหาลำดับของแต่ละแพ็คเกจ
        return order.indexOf(a.name) - order.indexOf(b.name);
      });

    return (
    <Box className="flex-col gap-2 border-b pb-4 cursor-pointer">
        <h2 className="text-xl font-semibold text-Title">Package</h2>
        <Box className="flex-col gap-2 mt-2">
             {sortedSizes?.map(size =>(
                <div 
                onClick={() => handleClick(size.name)}
                key={size.id} 
                className={cn("text-sm font-semibold text-Title2 flex items-center gap-2",
                    size.name === searchParams.get("size") && "text-primary"
                )}>
                    <p>{size.name}
                        {/* ({size.value}) */}
                        </p>
                    {size.name === searchParams.get("size") && (
                        <Check className="w-4 h-4 text-primary" />
                )}
                </div>
            ))}
        </Box>
    </Box>
  )
}

export default SizesFilter;