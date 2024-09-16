import { useState } from 'react';
import './Console.css';  // External CSS file
import { handleCommandSubmit } from '../../utils/commandHandler';  // Import the command handler

const Console = ({ placeholder = 'Enter commands here...' }) => {
  const [input, setInput] = useState('');  // User input
  const [history, setHistory] = useState([]);  // Console command/result history
  const [commandHistory, setCommandHistory] = useState([]);  // Store only commands
  const [historyIndex, setHistoryIndex] = useState(-1);  // Track current position in command history

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {  // Handle Enter key
      e.preventDefault();
      if (input.trim()) {
        const result = await handleCommandSubmit(input);  // Execute command
        setHistory((prev) => [
          ...prev,
          { type: 'command', text: input },  // Store the command without ">"
          { type: 'result', text: result },  // Store the result
        ]);
        setCommandHistory((prev) => [...prev, input]);  // Store command for history navigation
        setHistoryIndex(-1);  // Reset history index
        setInput('');  // Clear input
      }
    } else if (e.key === 'ArrowUp') {  // Navigate up in command history
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);  // Load previous command
      }
    } else if (e.key === 'ArrowDown') {  // Navigate down in command history
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);  // Load next command
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);  // Reset history index
        setInput('');  // Clear input if at the latest command
      }
    }
  };

  const renderTable = (data, index) => {
    if (!Array.isArray(data) || data.length === 0) return null;

    const keys = Object.keys(data[0]);

    return (
      <table key={index} className="console-table">
        <thead>
          <tr>{keys.map((key) => <th key={key}>{key}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {keys.map((key) => <td key={key}>{row[key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderHistory = () => {
    return history.map((entry, index) => {
      if (entry.type === 'command') {
        return <div key={index} className="console-command">{entry.text}</div>;  // Render command without ">"
      }
      if (entry.type === 'result') {
        if (Array.isArray(entry.text) && typeof entry.text[0] === 'object') {
          // Render array of dataframes as multiple tables
          return entry.text.map((dataframe, idx) => (
            <div key={`${index}-${idx}`}>
              {renderTable(dataframe, idx)}
            </div>
          ));
        }
        if (typeof entry.text === 'object' && entry.text !== null) {
          // Render single dataframe or object as a table
          return renderTable(entry.text, index);
        }
        // Handle other types of results (e.g., string or simple text)
        return <pre key={index} className="console-result">{entry.text}</pre>;
      }
      return null;
    });
  };

  return (
    <div className="console-wrapper">
      {/* Render command and result history */}
      {renderHistory()}

      {/* Console input */}
      <div className="console-input-wrapper">
        <span className="console-prompt">&gt;</span>  {/* Keep prompt for input */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="console-input"
        />
      </div>
    </div>
  );
};

export default Console;
