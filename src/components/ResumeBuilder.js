import React, { useState } from 'react';
import ResumeSection from './ResumeSection';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { makeStyles } from '@material-ui/core/styles';
import Details from './Details';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '70vw',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      fontSize: '1rem',
    },
  },
}));

const ResumeBuilder = () => {
  const classes = useStyles();
  const [sections, setSections] = useState(Details); //"Details" is an array of objects imported.
  const [editingSectionId, setEditingSectionId] = useState(null);
  
  const handleEditSection = (sectionId, newTitle) => {
    setSections((prevSections) =>
      prevSections.map((section) => (section.id === sectionId ? { ...section, title: newTitle } : section))
    );
  };

  const handleToggleSection = (sectionId, enabled) => {
    setSections((prevSections) =>
      prevSections.map((section) => (section.id === sectionId ? { ...section, enabled } : section))
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSections((items) => {
        const activeIndex = items.findIndex((section) => section.id === Number(active.id));
        const overIndex = items.findIndex((section) => section.id === Number(over.id));
        return arrayMove(items, activeIndex, overIndex);
      });
    }

    // Resetting the transform and transition after dragging
    const activeDraggable = document.getElementById(active.id);
    if (activeDraggable) {
      activeDraggable.style.transform = '';
      activeDraggable.style.transition = '';
    }
  };

  const handleEditStart = (sectionId) => {
    setEditingSectionId(sectionId);
  };

  const handleEditEnd = () => {
    setEditingSectionId(null);
  };

  const [editDisable, setEditDisable] = useState(-1);
  const handleEditDisable = (id) => {
    setEditDisable(id);
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className={classes.container}>
        <SortableContext items={sections} strategy={verticalListSortingStrategy}>
          {sections.map((section) => (
            <ResumeSection
              key={section.id}
              id={section.id}
              title={section.title}
              description={section.description}
              enabled={section.enabled}
              onEdit={handleEditSection}
              onToggle={handleToggleSection}
              editing={editingSectionId === section.id}
              onEditStart={handleEditStart}
              onEditEnd={handleEditEnd}
              editDisable={editDisable}
              onHandleEditDisable = {handleEditDisable}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default ResumeBuilder;




// import React, { useState } from 'react';
// import ResumeSection from './ResumeSection';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { makeStyles } from '@material-ui/core/styles';
// import Details from './Details';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     width: '70vw',
//     [theme.breakpoints.down('xs')]: {
//       width: '100%',
//       fontSize: '1rem',
//     },
//   },
// }));

// const ResumeBuilder = () => {
//   const classes = useStyles();
//   const [sections, setSections] = useState(Details);  //"Details" is array of objects imported.
//   const [editingSectionId, setEditingSectionId] = useState(null);

//   const handleEditSection = (sectionId, newTitle) => {
//     setSections((prevSections) =>
//       prevSections.map((section) => (section.id === sectionId ? { ...section, title: newTitle } : section))
//     );
//   };

//   const handleToggleSection = (sectionId, enabled) => {
//     setSections((prevSections) =>
//       prevSections.map((section) => (section.id === sectionId ? { ...section, enabled } : section))
//     );
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setSections((items) => {
//         const activeIndex = items.findIndex((section) => section.id === Number(active.id));
//         const overIndex = items.findIndex((section) => section.id === Number(over.id));
//         return arrayMove(items, activeIndex, overIndex);
//       });
//     }

//     // Resetting the transform and transition after dragging
//     const activeDraggable = document.getElementById(active.id);
//     if (activeDraggable) {
//       activeDraggable.style.transform = '';
//       activeDraggable.style.transition = '';
//     }
//   };

//   const handleEditStart = (sectionId) => {
//     setEditingSectionId(sectionId);
//   };

//   const handleEditEnd = () => {
//     setEditingSectionId(null);
//   };

//   return (
//     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//       <div className={classes.container}>
//         <SortableContext items={sections} strategy={verticalListSortingStrategy}>
//           {sections.map((section) => (
//             <ResumeSection
//               key={section.id}
//               id={section.id}
//               title={section.title}
//               description={section.description}
//               enabled={section.enabled}
//               onEdit={handleEditSection}
//               onToggle={handleToggleSection}
//               editing={editingSectionId === section.id}
//               onEditStart={handleEditStart}
//               onEditEnd={handleEditEnd}
//             />
//           ))}
//         </SortableContext>
//       </div>
//     </DndContext>
//   );
// };

// export default ResumeBuilder;
