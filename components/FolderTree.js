import React from 'react';
import { useRouter } from 'next/router';

const TreeNode = ({ node, onSelect }) => {
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;

  const handleSelect = () => {
    if (onSelect) {
      onSelect(node);
    }
  };

  return (
    <div>
      <div onClick={handleSelect} style={{ cursor: 'pointer' }}>
        {node.name}
      </div>
      {hasChildren &&
        node.children.map((childNode) => (
          <TreeNode key={childNode.id} node={childNode} onSelect={onSelect} />
        ))}
    </div>
  );
};

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