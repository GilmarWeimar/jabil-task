using Backend.Enums;

namespace Backend.Dtos
{
    public class TaskResponseDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public TaskPriority Priority { get; set; }
        public Backend.Enums.TaskStatus Status { get; set; }
        public DateTime CreationDate { get; set; }
    }
}