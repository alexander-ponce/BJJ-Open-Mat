import { useDrop } from 'react-dnd'

const DropTarget = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'image',
    drop: () => ({ name: 'DropTarget' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  let backgroundColor = 'white';
  if (canDrop) backgroundColor = '#3db897';
  if (isOver) backgroundColor = '#4bdcb5';

  return (
    <div ref={drop} style={{ backgroundColor, width: '200px', height: '200px', lineHeight: '200px', textAlign: 'center'}}>
      Drop here
    </div>
  );
};

export default DropTarget;

