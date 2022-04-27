import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactElement } from 'react';
import { UserProvider } from '../Utils/ContextAPI';
import { Success } from '../Pages';

interface PropType {
  children: ReactElement
}

const RenderWithProvider = ({ children }: PropType) => (
  <UserProvider>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </UserProvider>
);
test('Render Component Success', () => {
  render(<RenderWithProvider><Success /></RenderWithProvider>);
});

test('Thanks Text', () => {
  render(<RenderWithProvider><Success /></RenderWithProvider>);
  const thanksText = screen.getByText('Thanks,');
  expect(thanksText).toBeInTheDocument();
});

test("We've recieved your application Text", () => {
  render(<RenderWithProvider><Success /></RenderWithProvider>);
  const recieveApplicationText = screen.getByText("We've recieved your application.");
  expect(recieveApplicationText).toBeInTheDocument();
});

test('Application Process Text', async () => {
  render(<RenderWithProvider><Success /></RenderWithProvider>);
  const processText = await screen.findByTestId('process_text');
  expect(processText).toHaveTextContent('We’ll process your application as soon as possible and send you a decision within 30 days to . We will contact you in case more information is needed.While we’re reviewing your application, please don’t submit another application for the uPet’s breeder program.');
});
