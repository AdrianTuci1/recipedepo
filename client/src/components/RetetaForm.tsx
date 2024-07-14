import React, { useState, useEffect } from 'react';
import { RecipeCardProps } from './RecipeCard';
import '../styles/retetaform.scss';

interface RecipeFormProps {
  onSubmit: (data: RecipeCardProps) => void;
  initialData: RecipeCardProps;
}

// Separate Ingredient component
interface IngredientProps {
  ingredient: string;
  onRemove: () => void;
}

const Ingredient: React.FC<IngredientProps> = ({ ingredient, onRemove }) => (
  <div className="ingredient-item">
    <span>{ingredient}</span>
    <button type="button" onClick={onRemove} className='smallbtn'>
      -
    </button>
  </div>
);

// Separate Step component
interface StepProps {
  stepNumber: number;
  content: string;
  onRemove: () => void;
}

const Step: React.FC<StepProps> = ({ stepNumber, content, onRemove }) => (
  <div className="step-item">
    <h4 style={{width:'100px'}}>{stepNumber}</h4>
    <p>{content}</p>
    <button type="button" onClick={onRemove} className='smallbtn'>
      -
    </button>
  </div>
);

const RetetaForm: React.FC<RecipeFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<RecipeCardProps>(initialData);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  const [newStep, setNewStep] = useState('');
  const [isPublic, setIsPublic] = useState<boolean>(false);

  useEffect(() => {
    // Parse ingredients and steps from initialData (if provided)
    if (initialData.ingredients && typeof initialData.ingredients === 'string') {
      try {
        const parsedIngredients = JSON.parse(initialData.ingredients);
        setIngredients(parsedIngredients);
      } catch (error) {
        console.error('Error parsing ingredients:', error);
      }
    }
    if (initialData.steps && typeof initialData.steps === 'string') {
      try {
        const parsedSteps = JSON.parse(initialData.steps);
        setSteps(parsedSteps);
      } catch (error) {
        console.error('Error parsing steps:', error);
      }
    }
  }, [initialData]);

  // Add ingredient
  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient('');
    }
  };

  // Remove ingredient
  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  // Add step
  const handleAddStep = () => {
    if (newStep.trim()) {
      setSteps([...steps, newStep]);
      setNewStep('');
    }
  };

  // Remove step
  const handleRemoveStep = (index: number) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Prepare the final data object
    const finalData = {
      ...formData, // Spread existing form data
      ingredients, // Add ingredients array
      steps, // Add instructions array
      isPublic, // Add isPublic boolean
    };
  
    // Call onSubmit with the prepared JSON data
    const parsedData = JSON.parse(JSON.stringify(finalData));

    if(onSubmit) {
      onSubmit(parsedData);
    } else {
      console.error('onSubmit function not provided');
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setFormData({ ...formData, imageUrl }); // Update form data with preview URL
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, imageUrl: '' }); // Reset imageUrl to empty string
  };

  return (
    <form id="recipe-form" onSubmit={handleSubmit} className="recipe-form">
      <h2>{initialData.title ? 'Edit Recipe' : 'Add Recipe'}</h2>

      <label htmlFor="title">Nume reteta:</label>
      <input type="text" id="title" name="title" required value={formData.title} onChange={handleChange} />

      <label htmlFor="imageUrl">Image (optional):</label>
      {formData.imageUrl && (
        <div className="image-preview">
          <img src={formData.imageUrl} alt="Preview" />
          <button type="button" onClick={handleRemoveImage} style={{width:'100px'}}>Sterge imaginea</button>
        </div>
      )}
      <input type="file" id="imageUrl" name="imageUrl" onChange={handleImageChange} />

      <label htmlFor="cookingTime">Timp de gatit:</label>
      <input type="range" id="cookingTime" name="cookingTime" min={0} max={120} step={5} required value={formData.cookingTime} onChange={handleChange} />
      <span>{formData.cookingTime} min</span>

      <label htmlFor="prepTime">Timp de preparare:</label>
      <input type="range" id="prepTime" name="prepTime" min={10} max={50} step={5} required value={formData.prepTime} onChange={handleChange} />
      <span>{formData.prepTime} min</span>

      <label htmlFor="type">Tip:</label>
      <select id="type" name="type" value={formData.type} onChange={handleChange}>
        <option value="altele">Altele</option>
        <option value="vegan">Vegan</option>
        <option value="pui">Pui</option>
        <option value="porc">Porc</option>
        <option value="vita">Vita</option>
        <option value="oaie">Oaie</option>
        <option value="peste">Peste</option>
      </select>

      <label htmlFor="servings">Portii:</label>
      <input type="number" id="servings" name="servings" min="1" required value={formData.servings} onChange={handleChange} />

      <label htmlFor="difficulty">Difficulty Level:</label>
      <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label htmlFor="price">Pret:</label>
      <input type="range" id="price" name="price" min={1} max={4} step={1} value={formData.price} onChange={handleChange} />
      <span>{formData.price} $$$$</span>

      <label htmlFor="kitchen">Bucatarie:</label>
      <select id="kitchen" name="kitchen" value={formData.kitchen} onChange={handleChange}>
        <option value="romaneasca">Romaneasca</option>
        <option value="italiana">Italiana</option>
        <option value="spaniola">Spaniola</option>
        <option value="altele">Alta</option>
      </select>
      {formData.kitchen === 'altele' && (
        <input
          type="text"
          name="otherKitchen"
          value={formData.otherKitchen || ''}
          onChange={handleChange}
          placeholder="Introduceti bucataria"
        />
      )}

      <h3>Ingrediente</h3>
      <div className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <Ingredient
            key={index}
            ingredient={ingredient}
            onRemove={() => handleRemoveIngredient(index)}
          />
        ))}
      </div>
      <div className="add-item">
        <input
          type="text"
          value={newIngredient}
          onChange={(event) => setNewIngredient(event.target.value)}
          placeholder="Add Ingredient"
        />
        <button type="button" onClick={handleAddIngredient} className='smallbtn'>+</button>
      </div>

      <h3>Instructiuni</h3>
      <div className="steps-list">
        {steps.map((step, index) => (
          <Step
            key={index}
            stepNumber={index + 1}
            content={step}
            onRemove={() => handleRemoveStep(index)}
          />
        ))}
      </div>
      <div className="add-item">
        <input
          type="text"
          value={newStep}
          onChange={(event) => setNewStep(event.target.value)}
          placeholder="Add Step"
        />
        <button type="button" onClick={handleAddStep} className='smallbtn'>+</button>
      </div>

      <label htmlFor="isPublic">Vizibilitate:</label>
      <select value={isPublic ? "true" : "false"} onChange={(event) => setIsPublic(event.target.value === 'true')}>
        <option value="false">Private</option>
        <option value="true">Public</option>
      </select>

      <button type="submit">
        {initialData.title ? 'Editeaza Reteta' : 'Adauga Reteta'}
      </button>
    </form>
  );
};

export default RetetaForm;
