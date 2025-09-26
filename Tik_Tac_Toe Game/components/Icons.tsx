import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import type { PropsWithChildren } from 'react';
import React from 'react';

type IconsProps = PropsWithChildren<{
    name:string;
}>

const Icons = ({name}:IconsProps) => {
  switch (name) {
    case 'circle':
        return <Feather name="circle" size={30} color="orange" />
    case 'cross':
        return <Entypo name="cross" size={34} color="blue" />
  
    default:
        return <FontAwesome name="pencil" size={24} color="lightgrey" />
  }
}

export default Icons