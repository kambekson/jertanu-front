import { useState, useRef, useEffect } from 'react';

// Autocomplete component
const AutocompleteInput = ({
  placeholder,
  inputlabel,
}: {
  placeholder: string;
  inputlabel: string;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([
    'Астана',
    'Алматы',
    'Шымкент',
    'Караганда',
    'Актобе',
    'Тараз',
    'Павлодар',
    'Усть-Каменогорск',
  ]);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on input
  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter((option: string) => option.toLowerCase().includes(inputValue.toLowerCase())),
      );
    }
  }, [inputValue, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <label
          htmlFor="autocomplete-input"
          className="block overflow-hidden rounded border border-transparent px-3 focus-within:bg-orange-50 w-52"
        >
          <span className="text-xs font-medium text-gray-700">{inputlabel}</span>

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full border-none p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-base"
          />
        </label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute inset-y-0 right-0 flex items-center pr-2"
        ></button>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 max-w-[286] mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto scrollbar-none"
        >
          <ul className="py-1">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className="px-3 py-1 hover:bg-gray-100 cursor-pointer scrollbar-none"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
