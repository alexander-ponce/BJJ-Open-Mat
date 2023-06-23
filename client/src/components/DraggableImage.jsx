import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrag } from 'react-dnd'
import myImage from './bluebelt.png';

const DraggableImage = () => {
  const [{isDragging}, drag] = useDrag(() => ({
    type: 'image',
    item: { name: 'myImage' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <img src={myImage} alt="Draggable element" width={100} height={100} />
    </div>
  );
};



export default DraggableImage;