import { Button } from '@cubeartisan/cubeartisan/components/Button/Button';
import { HStack, Stack } from '@cubeartisan/cubeartisan/components/Stack';

export const TestButton = () => {
  const testSizes = {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
    '2xl': '2xl',
  } as const;

  const testSize = testSizes.md;

  return (
    <Stack as="main" atoms={{ minHeight: 'screenH', width: 'content-60', marginInline: 'auto' }}>
      <HStack>
        <Button recipe={{ size: testSize, color: 'neutral' }}>neutral</Button>
        <Button recipe={{ size: testSize, color: 'primary' }}>primary</Button>
        <Button recipe={{ size: testSize, color: 'info' }}>info</Button>
        <Button recipe={{ size: testSize, color: 'success' }}>success</Button>
        <Button recipe={{ size: testSize, color: 'warning' }}>warning</Button>
        <Button recipe={{ size: testSize, color: 'danger' }}>danger</Button>
      </HStack>
      <HStack>
        <Button recipe={{ size: testSize, color: 'neutralSolid' }}>neutral</Button>
        <Button recipe={{ size: testSize, color: 'primarySolid' }}>primary</Button>
        <Button recipe={{ size: testSize, color: 'infoSolid' }}>info</Button>
        <Button recipe={{ size: testSize, color: 'successSolid' }}>success</Button>
        <Button recipe={{ size: testSize, color: 'warningSolid' }}>warning</Button>
        <Button recipe={{ size: testSize, color: 'dangerSolid' }}>danger</Button>
      </HStack>
      <HStack>
        <Button recipe={{ size: testSizes.xs, color: 'neutralSolid' }}>neutral</Button>
        <Button recipe={{ size: testSizes.sm, color: 'primarySolid' }}>primary</Button>
        <Button recipe={{ size: testSizes.md, color: 'infoSolid' }}>info</Button>
        <Button recipe={{ size: testSizes.lg, color: 'successSolid' }}>success</Button>
        <Button recipe={{ size: testSizes.xl, color: 'warningSolid' }}>warning</Button>
        <Button recipe={{ size: testSizes['2xl'], color: 'dangerSolid' }}>danger</Button>
      </HStack>
    </Stack>
  );
};
