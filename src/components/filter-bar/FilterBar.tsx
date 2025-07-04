import { Chip, Button, MenuItem, Select, FormControl, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { CATEGORY_LIST } from '../../constants/categories';
import React from 'react';

import type { CategoryId } from '../../constants/categories';

export interface FilterBarProps {
  categories: typeof CATEGORY_LIST;
  selectedCategories: CategoryId[];
  onCategoryChange: (cats: CategoryId[]) => void;
  selectedDates: string[];
  onDateChange: (dates: string[]) => void;
  onClear: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  selectedDates,
  onDateChange,
  onClear,
}) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Category</InputLabel>
        <Select
          multiple
          value={selectedCategories}
          onChange={e => {
            let value = e.target.value;
            if (typeof value === 'string') value = value.split(',') as CategoryId[];
            onCategoryChange(value);
          }}
          input={<OutlinedInput label="Category" />}
          renderValue={selected =>
            selected
              .map(id => {
                const cat = categories.find(c => c.id === id);
                return cat ? cat.label : id;
              })
              .join(', ')
          }
        >
          {categories.map(cat => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="date"
        size="small"
        value={selectedDates.length > 0 ? selectedDates[0] : ''}
        onChange={e => {
          const val = e.target.value;
          if (val && !selectedDates.includes(val)) {
            onDateChange([...selectedDates, val]);
          }
        }}
        sx={{ width: 140 }}
        slotProps={{ inputLabel: { shrink: true } }}
      />
      {selectedCategories.map(catId => {
        const cat = categories.find(c => c.id === catId);
        return (
          <Chip
            key={catId}
            label={cat ? cat.label : catId}
            onDelete={() => onCategoryChange(selectedCategories.filter(c => c !== catId))}
            variant="outlined"
          />
        );
      })}
      {selectedDates.map(date => (
        <Chip
          key={date}
          label={date}
          onDelete={() => onDateChange(selectedDates.filter(d => d !== date))}
          color="primary"
          variant="outlined"
        />
      ))}
      {(selectedCategories?.length > 0 || selectedDates?.length > 0) && (
        <Button size="small" onClick={onClear} color="secondary" variant="outlined">
          Clear All
        </Button>
      )}
    </div>
  );
};

export default FilterBar;
