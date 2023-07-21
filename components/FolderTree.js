import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useRouter } from 'next/router';

export default function FolderTree(props) {
  const renderTree = (nodes) => {
    if (nodes.name === 'post') {
      // Render only the children of the "post" folder directly
      return nodes.children.map((node) => renderTree(node));
    }

    return (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
      </TreeItem>
    );
  };

  const router = useRouter();
  const expandedNodes = [props.tree.id];

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={expandedNodes}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={(event, nodIds) => {
        const currentNode = props.flattenNodes.find((aNode) => aNode.id === nodIds);

        if (currentNode != null && currentNode.routePath != null) {
          router.push(currentNode.routePath);
        }
      }}
      sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      className="external-tree-view"
    >
      {renderTree(props.tree)}
    </TreeView>
  );
}
