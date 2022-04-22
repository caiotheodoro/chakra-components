import { Box, Input } from "@chakra-ui/react";
import { RefObject, useEffect, useRef, useState } from "react";
import { useOutsideClick } from '@chakra-ui/react'
const data = [
    {
        id: 1,
        name: "Javascript",
    },
    {
        id: 2,
        name: "Typescript",
    },
    {
        id: 3,
        name: "React",
    },
    {
        id: 4,
        name: "Node",
    },
    {
        id: 5,
        name: "Express",
    },
    {
        id: 6,
        name: "MongoDB",
    },
]

export function Autocomplete() {
    const ref = useRef<HTMLDivElement>(null)
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([] as any[]);
    const [open, setOpen] = useState(false);
    useOutsideClick({
        ref: ref,
        handler: () => setOpen(false),
    })

    useEffect(() => {
        const results = data.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
        setOptions(results);

    }, [value]);
    return (
        <Box ref={ref}>
            <Box height="auto" position={"relative"}>
                <Input onSelect={() => setOpen(true)} value={value} placeholder="Search" onChange={(e) => setValue(e.target.value)} />
                <Box  top="100%" left="0" width="100%" height="auto" zIndex={-1}>
                    {
                        open && (
                            <Box
                                position={"absolute"}
                                width="100%"
                                bg="white"
                                borderRadius="lg"
                                overflow="hidden"
                                borderWidth="1px"
                                zIndex={1}
                                borderColor="gray.200"
                                height={"auto"}
                                borderStyle="solid"
                                boxShadow="0px 0px 8px rgba(0, 0, 0, 0.125)"
                                maxHeight=' 200px'
                                overflowY="scroll"
                            >
                                {options.map(item => (
                                    <Box
                                        display={"block"}
                                        key={item.id}
                                        _hover={{
                                            bg: "gray.300",
                                        }}
                                        _selected={{
                                            bg: "gray.500",
                                        }}
                                        w="100%"
                                        h="40px"
                                        p="5px"
                                        cursor="pointer"
                                        bg="white"
                                        color={"black"}
                                        borderBottomWidth="1px"
                                        borderBottomColor="gray.200"
                                        borderBottomStyle="solid"
                                        onClick={() => [setValue(item.name), setOpen(false)]}
                                    >
                                        {item.name}
                                    </Box>
                                ))}
                            </Box>
                        )
                    }
                </Box>
            </Box>
            
        </Box>
    )
}