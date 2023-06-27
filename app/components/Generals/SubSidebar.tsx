import React from 'react';

interface SubSidebarProps {
    children: React.ReactNode;
}
const SubSidebar: React.FC<SubSidebarProps> = ({ children }) => {
    return <div>{children}</div>;
};

export default SubSidebar;
