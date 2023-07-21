import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './treeStyles.css'; // Import the CSS file

const TreeNode = ({ node, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;
  const router = useRouter();

  const handleSelect = () => {
    if (onSelect) {
      onSelect(node);
    }
  };

  const handleToggle = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="tree-node">
      <div onClick={handleToggle}>
        {hasChildren && (isExpanded ? '-' : '+')} {node.name}
      </div>
      <div className={`tree-node-children ${isExpanded && hasChildren ? 'expanded' : ''}`}>
        {isExpanded &&
          hasChildren &&
          node.children.map((childNode) => (
            <TreeNode key={childNode.id} node={childNode} onSelect={onSelect} />
          ))}
      </div>
    </div>
  );
};

//export default TreeNode;


export default function FolderTree(props) {
  const router = useRouter();
  const expandedNodes = [props.tree.id];

  const handleNodeSelect = (selectedNode) => {
    if (selectedNode.routePath) {
      router.push(selectedNode.routePath);
    }
  };

  return (
    <div style={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
      {props.tree.children.map((node) => (
        <TreeNode key={node.id} node={node} onSelect={handleNodeSelect} />
      ))}
    </div>
  );
}