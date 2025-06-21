
import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Type
} from 'lucide-react';

interface ToolbarProps {
  onCommand: (command: string, value?: string) => void;
}

const Toolbar = ({ onCommand }: ToolbarProps) => {
  const toolbarButtons = [
    {
      group: 'text-formatting',
      buttons: [
        { icon: Bold, command: 'bold', tooltip: 'Bold (Ctrl+B)' },
        { icon: Italic, command: 'italic', tooltip: 'Italic (Ctrl+I)' },
        { icon: Underline, command: 'underline', tooltip: 'Underline (Ctrl+U)' },
      ]
    },
    {
      group: 'lists',
      buttons: [
        { icon: List, command: 'insertUnorderedList', tooltip: 'Bullet List' },
        { icon: ListOrdered, command: 'insertOrderedList', tooltip: 'Numbered List' },
      ]
    },
    {
      group: 'alignment',
      buttons: [
        { icon: AlignLeft, command: 'justifyLeft', tooltip: 'Align Left' },
        { icon: AlignCenter, command: 'justifyCenter', tooltip: 'Align Center' },
        { icon: AlignRight, command: 'justifyRight', tooltip: 'Align Right' },
      ]
    },
    {
      group: 'insert',
      buttons: [
        { icon: Link2, command: 'createLink', tooltip: 'Insert Link' },
      ]
    }
  ];

  const handleButtonClick = (command: string) => {
    if (command === 'createLink') {
      const url = prompt('Enter URL:');
      if (url) {
        onCommand(command, url);
      }
    } else {
      onCommand(command);
    }
  };

  return (
    <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
      <div className="flex items-center space-x-1">
        {/* Font size dropdown */}
        <select 
          className="mr-4 px-3 py-1 border border-gray-300 rounded text-sm bg-white hover:bg-gray-50 transition-colors"
          onChange={(e) => onCommand('fontSize', e.target.value)}
        >
          <option value="3">Normal</option>
          <option value="1">Small</option>
          <option value="4">Large</option>
          <option value="6">Heading</option>
        </select>

        {toolbarButtons.map((group, groupIndex) => (
          <React.Fragment key={group.group}>
            {group.buttons.map((button, buttonIndex) => {
              const IconComponent = button.icon;
              return (
                <button
                  key={button.command}
                  onClick={() => handleButtonClick(button.command)}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
                  title={button.tooltip}
                >
                  <IconComponent className="w-4 h-4" />
                </button>
              );
            })}
            {groupIndex < toolbarButtons.length - 1 && (
              <div className="w-px h-6 bg-gray-300 mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
