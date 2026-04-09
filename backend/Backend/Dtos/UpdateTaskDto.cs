using System.ComponentModel.DataAnnotations;
using Backend.Enums;

namespace Backend.Dtos
{
    public class UpdateTaskDto
    {
        [Required(ErrorMessage = "Title is required.")]
        [MaxLength(150, ErrorMessage = "Title can have at most 150 characters.")]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000, ErrorMessage = "Description can have at most 1000 characters.")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Priority is required.")]
        public TaskPriority Priority { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public Backend.Enums.TaskStatus Status { get; set; }
    }
}